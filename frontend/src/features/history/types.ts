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

//更新、削除時用の学生情報
export interface Stdent {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
}

export interface HistoryDelete {
  statusId: string;
  startTime: string;
  endTime?: string;
  other: string;
  validFlag: boolean;
}

//テーブル用
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
