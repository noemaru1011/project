export interface History {
  //現状はstudentと同じ
  studentId: number;
  studentName: string;
  grade: number;
  minorCategoryId: number;
}

export interface HistoryResult {
  HistoryId: number;
  studentName: string;
  grade: number;
  minorCategoryName: string;
  departmentName: string;
  statusName: string;
  other: string;
  startTime: string;
  endTime: string | null;
}
