export interface StudentDetail {
  studentId: number;
  studentName: string;
  grade: number;
  minorCategoryId: number;
  email: string;
  departmentId: number;
  updatedAt: string;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  grade: number;
  minorCategoryName: string;
  subCategoryName: string;
  categoryName: string;
  departmentName: string;
}
