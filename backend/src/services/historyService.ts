import { HistoryRepository } from '@/repositories/historyRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { formatDateTime } from '@/utils/formatDateTime';

export const HistoryService = {
  async getHistory(historyId: string) {
    const history = await HistoryRepository.find(historyId);
    if (!history) return null;
    return {
      studentName: history.student.studentName,
      grade: history.student.grade,
      departmentId: history.student.departmentId,
      minorCategoryId: history.student.minorCategoryId,
      statusId: history.statusId,
      other: history.other,
      validFlag: history.validFlag,
      startTime: formatDateTime(history.startTime),
      endTime: formatDateTime(history.endTime),
      updatedAt: history.updatedAt,
    };
  },

  async searchHistoies(data: {
    minorCategoryId?: number[];
    subCategoryId?: number[];
    categoryId?: number[];
    grade?: number[];
    departmentId?: number[];
  }) {
    const minorCategoryIds = await MinorCategoryRepository.resolveMinorCategoryIds(data);

    const histories = await HistoryRepository.searchHistoies({
      minorCategoryIds,
      departments: data.departmentId,
      grade: data.grade,
    });

    return histories.map((h) => ({
      historyId: h.historyId,
      studentName: h.student.studentName,
      grade: h.student.grade,
      departmentName: h.student.department.departmentName,
      minorCategoryName: h.student.minorCategory.minorCategoryName,
      statusName: h.status.statusName,
      other: h.other,
      startTime: formatDateTime(h.startTime),
      endTime: formatDateTime(h.endTime),
    }));
  },

  async createHistory(data: {
    studentIds: string[];
    statusId: number;
    other: string;
    startTime: Date;
    endTime?: Date | null;
  }) {
    await HistoryRepository.createHistory(data);
  },
};
