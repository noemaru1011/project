/**
 * APIから返却される詳細データ
 */
export interface StudentResponse {
  studentId: string;
  studentName: string;
  grade: string;
  minorCategoryId: string;
  email: string;
  departmentId: string;
  updatedAt: string;
  createdAt?: string; // 新規作成時のみ含まれる場合があるため、任意とするか必要に応じて分ける
}

/**
 * テーブル表示用の一覧データ
 */
export interface StudentSummary {
  studentId: string;
  studentName: string;
  grade: string;
  minorCategoryName: string;
  departmentName: string;
}
