import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const MinorCategoryRepository = {
  async findAll() {
    return prisma.minorCategory.findMany({
      select: {
        minorCategoryId: true,
        minorCategoryName: true,
      },
      orderBy: { minorCategoryId: 'asc' },
    });
  },

  async resolveMinorCategoryIds(data: {
    minorCategoryId?: number[];
    subCategoryId?: number[];
    categoryId?: number[];
  }): Promise<number[]> {
    //大分類、中分類に紐づいた小分類を格納する配列
    let ids: number[] = [];

    if (data.categoryId?.length) {
      const mcs = await prisma.minorCategory.findMany({
        where: {
          subCategory: { categoryId: { in: data.categoryId } },
        },
        select: { minorCategoryId: true },
      });
      ids.push(...mcs.map((m) => m.minorCategoryId));
    }

    if (data.subCategoryId?.length) {
      const mcs = await prisma.minorCategory.findMany({
        where: {
          subCategoryId: { in: data.subCategoryId },
        },
        select: { minorCategoryId: true },
      });
      ids.push(...mcs.map((m) => m.minorCategoryId));
    }

    if (data.minorCategoryId?.length) {
      ids.push(...data.minorCategoryId);
    }

    return [...new Set(ids)];
  },
};
