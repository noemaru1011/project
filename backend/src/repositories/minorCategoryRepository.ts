import { Prisma, PrismaClient } from '@prisma/client';

export class MinorCategoryRepository {
  constructor(private prisma: Prisma.TransactionClient | PrismaClient) {}

  async findAll() {
    return await this.prisma.minorCategory.findMany({
      select: {
        minorCategoryId: true,
        minorCategoryName: true,
      },
      orderBy: { minorCategoryId: 'asc' },
    });
  }

  //大分類、中分類に紐づいた小分類を変えす関数
  //例：1大隊→111,112,113,121...
  //例：11中隊→111,112,113
  async resolveMinorCategoryIds(data: {
    minorCategoryIds?: number[];
    subCategoryIds?: number[];
    categoryIds?: number[];
  }): Promise<number[]> {
    if (
      !data.minorCategoryIds?.length &&
      !data.subCategoryIds?.length &&
      !data.categoryIds?.length
    ) {
      return [];
    }

    const where: Prisma.MinorCategoryWhereInput = {
      OR: [
        ...(data.minorCategoryIds?.length
          ? [{ minorCategoryId: { in: data.minorCategoryIds } }]
          : []),

        ...(data.subCategoryIds?.length ? [{ subCategoryId: { in: data.subCategoryIds } }] : []),

        ...(data.categoryIds?.length
          ? [
              {
                subCategory: {
                  categoryId: { in: data.categoryIds },
                },
              },
            ]
          : []),
      ],
    };

    const rows = await this.prisma.minorCategory.findMany({
      where,
      select: { minorCategoryId: true },
    });

    return rows.map((r) => r.minorCategoryId);
  }
}
