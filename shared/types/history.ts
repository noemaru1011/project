export interface HistoryDetail {
  historyId: string;
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
  statusId: string;
  other: string | null;
  startTime: string;
  endTime: string | null;
  validFlag: boolean;
  updatedAt: string;
}

export interface Stdent {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
}

export interface History {
  statusId: string;
  startTime: string;
  endTime?: string;
  other?: string;
  validFlag: boolean;
}

//テーブル用
export interface HistorySummary {
  historyId: string;
  studentName: string;
  grade: string;
  minorCategoryName: string;
  departmentName: string;
  statusName: string;
  other: string | null;
  startTime: string;
  endTime: string | null;
}
