export interface Student {
  studentId: number;
  studentName: string;
  grade: number;
  minorCategoryId: number;
}

export interface StudentDetail extends Student {
  email: string;
  departmentId: number;
}

export interface StudentForSearch {
  studentId: string;
  studentName: string;
  grade: number;
  minorCategoryName: string;
  subCategoryName: string;
  categoryName: string;
  departmentName: string;
}
