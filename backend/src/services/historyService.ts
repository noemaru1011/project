import { HistoryRepository } from '@/repositories/historyRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { ConflictError } from '@/errors/appError';
import { formatDateTime } from '@/utils/common/formatDateTime';
import { aggregateHistory } from '@/utils/history/aggregateHIstory';
import type { HistoreServerForm, HistoryUpdateServerForm } from '@shared/schemas/history';
import type { StudentQuerySeverForm } from '@shared/schemas/studentQuery';
import type { HistoryDetail, HistorySummary, HistoryNew, kari } from '@shared/types/history';

export const HistoryService = {
  async getHistory(historyId: string): Promise<HistoryDetail | null> {
    const history = await HistoryRepository.find(historyId);
    if (history == null) return null;
    //DTO
    return {
      historyId: history.historyId,
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
  },

  async searchHistories(data: StudentQuerySeverForm): Promise<HistorySummary[]> {
    const minorCategoryIds = await MinorCategoryRepository.resolveMinorCategoryIds(data);

    const histories = await HistoryRepository.searchHistories({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });
    //DTO
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
  },

  async searchByStartTimeHistories(query: Date) {
    const histories = await HistoryRepository.searchByStartTimeHistories(query);
    //構造をフラットに
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
  },

  async createHistory(data: HistoreServerForm): Promise<HistoryNew[]> {
    const histories = await HistoryRepository.createHistory(data);
    //DTO
    return histories.map((history) => ({
      historyId: history.historyId,
      studentId: history.studentId,
      statusId: history.statusId.toString(),
      other: history.other,
      startTime: formatDateTime(history.startTime)!,
      endTime: formatDateTime(history.endTime),
      validFlag: history.validFlag,
      createdAt: history.createdAt.toISOString(),
      updatedAt: history.updatedAt.toISOString(),
    }));
  },

  async updateHistory(data: HistoryUpdateServerForm, historyId: string): Promise<kari> {
    const history = await HistoryRepository.updateHistory(data, historyId);
    if (history == null) throw new ConflictError();
    //DTO
    return {
      historyId: history.historyId,
      studentId: history.studentId,
      statusId: history.statusId.toString(),
      other: history.other,
      startTime: formatDateTime(history.startTime)!,
      endTime: formatDateTime(history.endTime),
      validFlag: history.validFlag,
      updatedAt: history.updatedAt.toISOString(),
    };
  },

  async deleteHistory(historyId: string) {
    await HistoryRepository.deleteHistory(historyId);
  },
};
