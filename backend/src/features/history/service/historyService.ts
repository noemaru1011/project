import { HistoryRepository } from '@/features/history/repositories/historyRepository';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import { OptimisticLockError, InvalidReferenceError, NotFoundError } from '@/errors/appError';
import { formatDateTime } from '@/features/history/utils/formatDateTime';
import { aggregateHistory } from '@/features/history/utils/aggregateHIstory';
import { UpdateResult } from '@/types/UpdateResult';
import type {
  HistoryServerCreateInput,
  HistoryServerUpdateInput,
  HistoryResponse,
  HistorySummary,
} from '@shared/models/history';
import type { StudentServerSearchInput } from '@shared/models/student';
import type { PaginatedResponse } from '@shared/models/common';
import { StatusDuplicateError } from '@/errors/historyError';

export class HistoryService {
  constructor(
    private readonly historyRepo: HistoryRepository,
    private readonly minorCategoryRepo: MinorCategoryRepository,
  ) {}

  async getHistory(historyId: string): Promise<HistoryResponse> {
    const history = await this.historyRepo.findById(historyId);
    if (history == null) throw new NotFoundError();
    return {
      historyId: history.historyId,
      studentId: history.studentId,
      studentName: history.student.studentName,
      grade: history.student.grade.toString(),
      departmentName: history.student.department.departmentName,
      minorCategoryName: history.student.minorCategory.minorCategoryName,
      statusId: history.statusId.toString(),
      other: history.other,
      startTime: formatDateTime(history.startTime)!,
      endTime: formatDateTime(history.endTime),
      validFlag: history.validFlag,
      createdAt: history.createdAt.toISOString(),
      updatedAt: history.updatedAt.toISOString(),
    };
  }

  async searchHistories(data: StudentServerSearchInput): Promise<PaginatedResponse<HistorySummary>> {
    const minorCategoryIds = await this.minorCategoryRepo.resolveMinorCategoryIds(data);

    const page = data.page ?? 1;
    const limit = data.limit ?? 10;

    const [histories, total] = await Promise.all([
      this.historyRepo.search({
        minorCategoryIds,
        departmentIds: data.departmentIds,
        grades: data.grades,
        page,
        limit,
      }),
      this.historyRepo.countSearch({
        minorCategoryIds,
        departmentIds: data.departmentIds,
        grades: data.grades,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: histories.map((history) => ({
        historyId: history.historyId,
        studentName: history.student.studentName,
        grade: history.student.grade.toString(),
        departmentName: history.student.department.departmentName,
        minorCategoryName: history.student.minorCategory.minorCategoryName,
        statusName: history.status.statusName,
        other: history.other,
        startTime: formatDateTime(history.startTime)!,
        endTime: formatDateTime(history.endTime),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async searchByStartTimeHistories(query: Date) {
    const histories = await this.historyRepo.searchByStartTime(query);
    const historiesMapped = histories.map((h) => ({
      statusId: h.statusId,
      grade: h.student.grade,
      departmentId: h.student.departmentId,
      minorCategoryId: h.student.minorCategoryId,
      subCategoryId: h.student.minorCategory.subCategoryId,
      categoryId: h.student.minorCategory.subCategory.categoryId,
    }));

    const deptGradeAggregation = aggregateHistory.aggregateByDepartmentAndGrade(historiesMapped);
    const categoryAggregation = aggregateHistory.aggregateByCategoryHierarchy(historiesMapped);
    return { deptGradeAggregation, categoryAggregation };
  }

  async createHistory(data: HistoryServerCreateInput): Promise<HistoryResponse[]> {
    const results: HistoryResponse[] = [];
    const duplicateStudents: string[] = [];

    for (const studentId of data.studentIds) {
      // 指定期間と重複する履歴をチェック
      const overlaps = await this.historyRepo.findOverlappingHistories(
        studentId,
        data.startTime,
        data.endTime ?? null,
      );

      // 重複があれば名前を収集
      if (overlaps.length > 0) {
        // 名前を取得して配列に追加
        const studentNames = [
          ...new Set(overlaps.map((h) => h.student.studentName ?? '不明な学生')),
        ].join(', ');
        duplicateStudents.push(studentNames);
      }
    }

    // 重複学生がいたらまとめて例外
    if (duplicateStudents.length > 0) {
      const allStudents = duplicateStudents.join(', ');
      throw new StatusDuplicateError(allStudents);
    }

    try {
      // 重複なしなら履歴作成
      const created = await this.historyRepo.create({
        studentIds: data.studentIds,
        statusId: data.statusId,
        other: data.other,
        startTime: data.startTime,
        endTime: data.endTime,
      });

      results.push(
        ...created.map((history) => ({
          historyId: history.historyId,
          studentId: history.studentId,
          statusId: history.statusId.toString(),
          other: history.other,
          startTime: formatDateTime(history.startTime)!,
          endTime: formatDateTime(history.endTime),
          validFlag: history.validFlag,
          createdAt: history.createdAt.toISOString(),
          updatedAt: history.updatedAt.toISOString(),
        })),
      );
      return results;
    } catch (err: any) {
      //外部キー制約違反
      if (err.code === 'P2003') {
        throw new InvalidReferenceError();
      }
      throw err;
    }
  }

  async updateHistory(data: HistoryServerUpdateInput, historyId: string): Promise<HistoryResponse> {
    try {
      const history = await this.historyRepo.update(data, historyId);
      //更新失敗時のエラー処理
      //TODO 新規作成と同様に重複チェックを入れる

      //存在しない場合
      if (history == UpdateResult.NOT_FOUND) throw new NotFoundError();
      //楽観的ロックエラー
      if (history == UpdateResult.OPTIMISTIC_LOCK) throw new OptimisticLockError();

      return {
        historyId: history.historyId,
        studentId: history.studentId,
        statusId: history.statusId.toString(),
        other: history.other,
        startTime: formatDateTime(history.startTime)!,
        endTime: formatDateTime(history.endTime),
        validFlag: history.validFlag,
        createdAt: history.createdAt.toISOString(),
        updatedAt: history.updatedAt.toISOString(),
      };
    } catch (err: any) {
      //外部キー制約違反
      if (err.code === 'P2003') {
        throw new InvalidReferenceError();
      }
      throw err;
    }
  }

  async deleteHistory(historyId: string) {
    const history = await this.historyRepo.delete(historyId);
    if (history === 0) throw new NotFoundError();
  }
}
