export interface Student {
  studentId: number;
  studentName: string;
  grade: number;
  minorCategoryId: number;
  departmentId: number;
}

export interface StudentDetail extends Student {
  email: string;
}
