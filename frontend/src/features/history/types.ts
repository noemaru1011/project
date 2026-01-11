//更新、削除時用の学生情報
export interface Stdent {
  studentName: string;
  grade: string;
  minorCategoryId: string;
  departmentId: string;
}

export interface HistoryDelete {
  statusId: string;
  startTime: string;
  endTime?: string;
  other: string;
  validFlag: boolean;
}

export type AggregationData = {
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
};
