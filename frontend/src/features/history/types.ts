export interface HistoryDetail {
  historyId: string;
  studentName: string;
  grade: number;
  minorCategoryId: number;
  departmentId: number;
  statusId: number;
  other: string;
  startTime: string;
  endTime: string | null;
  validFlag: boolean;
  updatedAt: string;
}

export interface HistoryResult {
  historyId: number;
  studentName: string;
  grade: number;
  minorCategoryName: string;
  departmentName: string;
  statusName: string;
  other: string;
  startTime: string;
  endTime: string | null;
}
