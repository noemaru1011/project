export type DisplayStudent = {
  studentId: number;
  studentName: string;
  grade: number;

  /** もともとの ID 設計 */
  email?: string;
  minorCategoryId?: number;
  departmentId?: number;

  /** リレーション展開後の構造 */
  department?: {
    departmentName?: string;
  };

  minorCategory?: {
    minorCategoryName?: string;
    subCategory?: {
      subCategoryName?: string;
      category?: {
        categoryName?: string;
      };
    };
  };
};
