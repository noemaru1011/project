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
