import { StudentRepository } from '@/repositories/studentRepository';
import { HistoryRepository } from '@/repositories/historyRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { FormatDateTime } from '@/utils/formatDateTime';

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
    console.log(data);
    await HistoryRepository.createHistory(data);
  },
};
