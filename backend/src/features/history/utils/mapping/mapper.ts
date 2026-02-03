import { formatDateTime } from './formatDateTime';
import type { HistoryResponse, HistorySummary } from '@shared/models/history';

export const toHistoryResponse = (h: any): HistoryResponse => ({
  historyId: h.historyId,
  studentId: h.studentId,
  studentName: h.student?.studentName,
  grade: h.student?.grade?.toString(),
  departmentName: h.student?.department?.departmentName,
  minorCategoryName: h.student?.minorCategory?.minorCategoryName,
  statusId: h.statusId.toString(),
  other: h.other,
  startTime: formatDateTime(h.startTime)!,
  endTime: formatDateTime(h.endTime),
  validFlag: h.validFlag,
  createdAt: h.createdAt.toISOString(),
  updatedAt: h.updatedAt.toISOString(),
});

export const toHistorySummary = (h: any): HistorySummary => ({
  historyId: h.historyId,
  studentName: h.student.studentName,
  grade: h.student.grade.toString(),
  departmentName: h.student.department.departmentName,
  minorCategoryName: h.student.minorCategory.minorCategoryName,
  statusName: h.status.statusName,
  other: h.other,
  startTime: formatDateTime(h.startTime)!,
  endTime: formatDateTime(h.endTime),
});
