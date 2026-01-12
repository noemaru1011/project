export type AggregationData = {
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
};
