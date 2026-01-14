import { HistoryRepository } from '@/repositories/historyRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { ConflictError, InvalidReferenceError } from '@/errors/appError';
import { formatDateTime } from '@/utils/common/formatDateTime';
import { aggregateHistory } from '@/utils/history/aggregateHIstory';
import type {
  HistoryServerCreateInput,
  HistoryServerUpdateInput,
  HistoryResponse,
  HistorySummary,
} from '@shared/models/history';
import type { StudentServerSearchInput } from '@shared/models/student';

export class HistoryService {
  constructor(
    private historyRepo: HistoryRepository,
    private minorCategoryRepo: MinorCategoryRepository,
  ) {}

  async getHistory(historyId: string): Promise<HistoryResponse | null> {
    const history = await this.historyRepo.find(historyId);
    if (history == null) return null;
    return {
      historyId: history.historyId,
      studentId: history.studentId,
      studentName: history.student.studentName,
      grade: history.student.grade.toString(),
      departmentId: history.student.departmentId.toString(),
      minorCategoryId: history.student.minorCategoryId.toString(),
      statusId: history.statusId.toString(),
      other: history.other,
      startTime: formatDateTime(history.startTime)!,
      endTime: formatDateTime(history.endTime),
      validFlag: history.validFlag,
      updatedAt: history.updatedAt.toISOString(),
    };
  }

  async searchHistories(data: StudentServerSearchInput): Promise<HistorySummary[]> {
    const minorCategoryIds = await this.minorCategoryRepo.resolveMinorCategoryIds(data);

    const histories = await this.historyRepo.searchHistories({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });
    return histories.map((history) => ({
      historyId: history.historyId,
      studentName: history.student.studentName,
      grade: history.student.grade.toString(),
      departmentName: history.student.department.departmentName,
      minorCategoryName: history.student.minorCategory.minorCategoryName,
      statusName: history.status.statusName,
      other: history.other,
      startTime: formatDateTime(history.startTime)!,
      endTime: formatDateTime(history.endTime),
    }));
  }

  async searchByStartTimeHistories(query: Date) {
    const histories = await this.historyRepo.searchByStartTimeHistories(query);
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
    try {
      const histories = await this.historyRepo.createHistory(data);
      return histories.map((history) => ({
        historyId: history.historyId,
        studentId: history.studentId,
        studentName: history.student.studentName,
        grade: history.student.grade.toString(),
        departmentId: history.student.departmentId.toString(),
        minorCategoryId: history.student.minorCategoryId.toString(),
        statusId: history.statusId.toString(),
        other: history.other,
        startTime: formatDateTime(history.startTime)!,
        endTime: formatDateTime(history.endTime),
        validFlag: history.validFlag,
        createdAt: history.createdAt.toISOString(),
        updatedAt: history.updatedAt.toISOString(),
      }));
    } catch (err: any) {
      if (err.code === 'P2003') {
        throw new InvalidReferenceError();
      }
      throw err;
    }
  }

  async updateHistory(data: HistoryServerUpdateInput, historyId: string): Promise<HistoryResponse> {
    try {
      const history = await this.historyRepo.updateHistory(data, historyId);
      if (history == null) throw new ConflictError();
      return {
        historyId: history.historyId,
        studentId: history.studentId,
        studentName: history.student.studentName,
        grade: history.student.grade.toString(),
        departmentId: history.student.departmentId.toString(),
        minorCategoryId: history.student.minorCategoryId.toString(),
        statusId: history.statusId.toString(),
        other: history.other,
        startTime: formatDateTime(history.startTime)!,
        endTime: formatDateTime(history.endTime),
        validFlag: history.validFlag,
        updatedAt: history.updatedAt.toISOString(),
      };
    } catch (err: any) {
      if (err.code === 'P2003') {
        throw new InvalidReferenceError();
      }
      throw err;
    }
  }

  async deleteHistory(historyId: string) {
    await this.historyRepo.deleteHistory(historyId);
  }
}
