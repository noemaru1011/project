import { StudentRepository } from '@/repositories/studentRepository';
import { HistoryRepository } from '@/repositories/historyRepository';
import { formatDateTime } from '@/utils/formatDatetime';

export const HistoryService = {
  async searchHistoies(data: {
    minorCategoryId?: number[];
    subCategoryId?: number[];
    categoryId?: number[];
    grade?: number[];
    departmentId?: number[];
  }) {
    const minorCategoryIds = await StudentRepository.resolveMinorCategoryIds(data);

    const histories = await HistoryRepository.searchHistoies({
      minorCategoryIds,
      departments: data.departmentId,
      grade: data.grade,
    });

    return histories.map((h) => ({
      studentId: h.student.studentId,
      studentName: h.student.studentName,
      grade: h.student.grade,
      departmentName: h.student.department?.departmentName ?? null,
      minorCategoryName: h.student.minorCategory?.minorCategoryName ?? null,
      other: h.other,
      startTime: formatDateTime(h.startTime),
      endTime: formatDateTime(h.endTime),
    }));
  },

  async createHistory(data: {
    studentId: string[];
    StatusId: number;
    other: string;
    startTime: Date;
    endTime?: Date | null;
  }) {
    await HistoryRepository.createHistory(data);
  },
};
