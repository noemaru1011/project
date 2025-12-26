import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
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

  //大分類、中分類に紐づいた小分類を変えす関数
  //例：1大隊→111,112,113,121...
  //例：11中隊→111,112,113
  async resolveMinorCategoryIds(data: {
    minorCategoryId?: number[];
    subCategoryId?: number[];
    categoryId?: number[];
  }): Promise<number[]> {
    if (!data.minorCategoryId?.length && !data.subCategoryId?.length && !data.categoryId?.length) {
      return [];
    }

    const where: Prisma.MinorCategoryWhereInput = {
      OR: [
        ...(data.minorCategoryId?.length
          ? [{ minorCategoryId: { in: data.minorCategoryId } }]
          : []),

        ...(data.subCategoryId?.length ? [{ subCategoryId: { in: data.subCategoryId } }] : []),

        ...(data.categoryId?.length
          ? [
              {
                subCategory: {
                  categoryId: { in: data.categoryId },
                },
              },
            ]
          : []),
      ],
    };

    const rows = await prisma.minorCategory.findMany({
      where,
      select: { minorCategoryId: true },
    });

    return rows.map((r) => r.minorCategoryId);
  },
};
