/**
 * 学生の基本情報 (履歴詳細の左側などで使用)
 */
export interface StudentBasicInfo {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
}

/**
 * 履歴詳細データ(APIから返却される詳細データ)
 */
export interface HistoryResponse extends StudentBasicInfo {
  historyId: string;
  studentId: string;
  statusId: string;
  other: string | null;
  startTime: string;
  endTime: string | null;
  validFlag: boolean;
  updatedAt: string;
  createdAt: string;
}

/**
 * テーブル表示用の一覧データ
 */
export interface HistorySummary {
  historyId: string;
  studentName: string;
  grade: string;
  minorCategoryName: string;
  departmentName: string;
  statusName: string;
  other: string | null;
  startTime: string;
  endTime: string | null;
}

/**
 * 集計データ
 */
export interface AggregationData {
  deptGradeAggregation: Record<number, Record<number, Record<number, number>>>;
  categoryAggregation: Record<
    number,
    {
      status?: Record<number, number>;
      subCategories?: Record<
        number,
        {
          status?: Record<number, number>;
          minorCategories?: Record<number, Record<number, number>>;
        }
      >;
    }
  >;
}
