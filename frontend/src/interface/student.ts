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

export interface StudentForSearch {
  studentId: string;
  studentName: string;
  grade: number;
  minorCategory: {
    minorCategoryName: string;
    subCategory: {
      subCategoryName: string;
      category: {
        categoryName: string;
      };
    };
  };
  department: {
    departmentName: string;
  };
}
