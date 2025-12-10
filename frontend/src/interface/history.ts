export interface History {
  //現状はstudentと同じ
  studentId: number;
  studentName: string;
  grade: number;
  minorCategoryId: number;
}

export interface HistoryResult {
  studentId: string;
  studentName: string;
  grade: number;
  minorCategoryName: string;
  departmentName: string;
  other: string;
  startTime: string; // ← フォーマット済み
  endTime: string | null;
}
