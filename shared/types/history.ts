//明細画面用(右半分)
export interface HistoryDetail extends StdentInfo {
  historyId: string;
  statusId: string;
  other: string | null;
  startTime: string;
  endTime: string | null;
  validFlag: boolean;
  updatedAt: string;
}

//明細画面(左半分)
export interface StdentInfo {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
}

export interface kari {
  historyId: string;
  studentId: string;
  statusId: string;
  startTime: string;
  endTime: string | null;
  other: string | null;
  validFlag: boolean;
  updatedAt: string;
}

export interface HistoryNew extends kari {
  createdAt: string;
}

//テーブル用
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

export interface AggregationData {
  //学科・学年用
  deptGradeAggregation: Record<number, Record<number, Record<number, number>>>;
  //小・中・大分類用
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
