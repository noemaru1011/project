//明細画面で表示する型
export interface StudentDetail {
  studentId: string;
  studentName: string;
  grade: string;
  minorCategoryId: string;
  email: string;
  departmentId: string;
  updatedAt: string;
}

//新規作成時の型
export interface StudentNew extends StudentDetail {
  createdAt: string;
}

//テーブルに表示する型
export interface StudentSummary {
  studentId: string;
  studentName: string;
  grade: string;
  minorCategoryName: string;
  departmentName: string;
}
