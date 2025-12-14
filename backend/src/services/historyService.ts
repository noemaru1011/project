import { StudentRepository } from '@/repositories/studentRepository';
import { HistoryRepository } from '@/repositories/historyRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { FormatDateTime } from '@/utils/formatDateTime';
import { AppError } from '@/errors/AppError';

export const HistoryService = {
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
      departmentName: h.student.department?.departmentName ?? null,
      minorCategoryName: h.student.minorCategory?.minorCategoryName ?? null,
      other: h.other,
      startTime: FormatDateTime(h.startTime),
      endTime: FormatDateTime(h.endTime),
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

  async getHistory(historyId: string) {
    const history = await HistoryRepository.findById(historyId);
    if (!history) {
      throw new AppError('NOT_FOUND', '履歴が見つかりません', 404);
    }

    return {
      historyId: history.historyId,
      studentName: history.student.studentName,
      grade: history.student.grade,
      departmentName: history.student.department?.departmentName ?? null,
      minorCategoryName: history.student.minorCategory?.minorCategoryName ?? null,
      statusName: history.status.statusName,
      other: history.other,
      startTime: FormatDateTime(history.startTime),
      endTime: FormatDateTime(history.endTime),
    };
  },

  async updateHistory(
    data: {
      statusId: number;
      other: string;
      startTime: Date;
      endTime?: Date | null;
    },
    historyId: string,
  ) {
    await HistoryRepository.updateHistory(data, historyId);
  },

  async deleteHistory(historyId: string) {
    await HistoryRepository.deleteHistory(historyId);
  },
};
