interface History {
  statusId: number;
  grade: number;
  departmentId: number;
  minorCategoryId: number;
  subCategoryId: number;
  categoryId: number;
}

export const aggregateHistory = {
  //学年・学科の集計
  async aggregateByDepartmentAndGrade(histories: History[]) {
    const result: Record<number, Record<number, Record<number, number>>> = {};

    histories.forEach((h) => {
      const { departmentId, grade, statusId } = h;

      if (!result[departmentId]) result[departmentId] = {};
      if (!result[departmentId][grade]) result[departmentId][grade] = {};

      result[departmentId][grade][statusId] = (result[departmentId][grade][statusId] || 0) + 1;
    });

    return result;
  },

  //小・中・大分類の集計
  async aggregateByCategoryHierarchy(histories: History[]) {
    const result: Record<
      number, // categoryId (大分類)
      {
        status?: Record<number, number>;
        subCategories?: Record<
          number, // subCategoryId (中分類)
          {
            status?: Record<number, number>;
            minorCategories?: Record<
              number, // minorCategoryId (小分類)
              Record<number, number> // statusId -> count
            >;
          }
        >;
      }
    > = {};

    histories.forEach((h) => {
      const { categoryId, subCategoryId, minorCategoryId, statusId } = h;

      if (!result[categoryId]) result[categoryId] = { status: {}, subCategories: {} };

      // 大分類ごとの Status 集計
      result[categoryId].status![statusId] = (result[categoryId].status![statusId] || 0) + 1;

      // 中分類
      const sub = result[categoryId].subCategories!;
      if (!sub[subCategoryId]) sub[subCategoryId] = { status: {}, minorCategories: {} };

      sub[subCategoryId].status![statusId] = (sub[subCategoryId].status![statusId] || 0) + 1;

      // 小分類
      const minor = sub[subCategoryId].minorCategories!;
      if (!minor[minorCategoryId]) minor[minorCategoryId] = {};

      minor[minorCategoryId][statusId] = (minor[minorCategoryId][statusId] || 0) + 1;
    });

    return result;
  },
};
