import { Prisma } from '@prisma/client';
import { HistoryRepository } from '@/features/history/repositories/historyRepository';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import { UpdateResult } from '@/types/UpdateResult';
import {
  OptimisticLockError,
  InvalidReferenceError,
  NotFoundError,
  StatusDuplicateError,
} from '@/errors';
import {
  toHistoryResponse,
  toHistorySummary,
  aggregateHistory,
} from '@/features/history/utils/index';
import type {
  HistoryServerCreateInput,
  HistoryServerUpdateInput,
  HistoryResponse,
  HistorySummary,
} from '@shared/models/history';
import type { StudentServerSearchInput } from '@shared/models/student';

export class HistoryService {
  constructor(
    private readonly historyRepo: HistoryRepository,
    private readonly minorCategoryRepo: MinorCategoryRepository,
  ) {}

  async getHistory(historyId: string): Promise<HistoryResponse> {
    const history = await this.historyRepo.findById(historyId);
    if (history == null) throw new NotFoundError();
    return toHistoryResponse(history);
  }

  async searchHistories(data: StudentServerSearchInput): Promise<HistorySummary[]> {
    const minorCategoryIds = await this.minorCategoryRepo.resolveMinorCategoryIds(data);

    const histories = await this.historyRepo.search({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });
    return histories.map(toHistorySummary);
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
    const duplicateStudents: string[] = [];

    // 重複チェックロジック（既存のまま）
    for (const studentId of data.studentIds) {
      const overlaps = await this.historyRepo.findOverlappingHistories(
        studentId,
        data.startTime,
        data.endTime ?? null,
      );

      if (overlaps.length > 0) {
        const studentNames = [
          ...new Set(overlaps.map((h) => h.student.studentName ?? '不明な学生')),
        ].join(', ');
        duplicateStudents.push(studentNames);
      }
    }

    if (duplicateStudents.length > 0) {
      throw new StatusDuplicateError(duplicateStudents.join(', '));
    }

    try {
      const created = await this.historyRepo.create({
        studentIds: data.studentIds,
        statusId: data.statusId,
        other: data.other,
        startTime: data.startTime,
        endTime: data.endTime,
      });

      return created.map(toHistoryResponse);
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // 外部キー制約違反 (Foreign key constraint failed)
        if (err.code === 'P2003') {
          throw new InvalidReferenceError();
        }
      }
      throw err;
    }
  }

  async updateHistory(data: HistoryServerUpdateInput, historyId: string): Promise<HistoryResponse> {
    try {
      const current = await this.historyRepo.findById(historyId);
      if (!current) throw new NotFoundError();

      // 入力値があればそれ、なければ現在の値を使って期間を判定
      const targetStartTime = data.startTime ?? current.startTime;
      const targetEndTime = data.endTime !== undefined ? data.endTime : current.endTime;

      const overlaps = await this.historyRepo.findOverlappingHistories(
        current.studentId,
        targetStartTime,
        targetEndTime,
        historyId, // 自分のIDを渡して除外させる
      );

      if (overlaps.length > 0) {
        // 重複があればエラーを投げる
        const studentName = overlaps[0].student.studentName ?? '不明な学生';
        throw new StatusDuplicateError(studentName);
      }

      const history = await this.historyRepo.update(data, historyId);

      if (history == UpdateResult.NOT_FOUND) throw new NotFoundError();
      if (history == UpdateResult.OPTIMISTIC_LOCK) throw new OptimisticLockError();

      return toHistoryResponse(history);
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // 外部キー制約違反 (Foreign key constraint failed)
        if (err.code === 'P2003') {
          throw new InvalidReferenceError();
        }
      }
      throw err;
    }
  }

  async deleteHistory(historyId: string) {
    const history = await this.historyRepo.delete(historyId);
    if (history === 0) throw new NotFoundError();
  }
}
