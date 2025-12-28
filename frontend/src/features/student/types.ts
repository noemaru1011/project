export interface StudentDetail {
  studentId: string;
  studentName: string;
  grade: string;
  minorCategoryId: string;
  email: string;
  departmentId: string;
  updatedAt: string;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  grade: string;
  minorCategoryName: string;
  subCategoryName: string;
  categoryName: string;
  departmentName: string;
}
