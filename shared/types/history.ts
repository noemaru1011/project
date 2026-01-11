//明細画面用
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

export interface StdentInfo {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
}

export interface kari {
  historyId: string;
  studentId: string;
  statusId: string;
  startTime: string;
  endTime: string | null;
  other: string | null;
  validFlag: boolean;
  updatedAt: string;
}

export interface HistoryNew extends kari {
  createdAt: string;
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
