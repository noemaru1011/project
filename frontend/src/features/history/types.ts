export interface HistoryDetail {
  historyId: string;
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
  statusId: string;
  other: string;
  startTime: string;
  endTime: string | null;
  validFlag: boolean;
  updatedAt: string;
}

export type HistoryBasic = {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
};

export type HistoryDelete = {
  statusId: string;
  startTime: string;
  endTime?: string;
  other: string;
  validFlag: boolean;
};

export interface HistoryResult {
  historyId: string;
  studentName: string;
  grade: string;
  minorCategoryName: string;
  departmentName: string;
  statusName: string;
  other: string;
  startTime: string;
  endTime: string | null;
}
