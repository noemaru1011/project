import { PrismaClient } from '@prisma/client';
import type { SubCategory } from '@shared/types/subCategory';

const prisma = new PrismaClient();

export const SubCategoryRepository = {
  async findAll(): Promise<SubCategory[]> {
    const rows = await prisma.subCategory.findMany({
      select: {
        subCategoryId: true,
        subCategoryName: true,
      },
      orderBy: { subCategoryId: 'asc' },
    });
    return rows.map((row) => ({
      subCategoryId: row.subCategoryId.toString(),
      subCategoryName: row.subCategoryName,
    }));
  },
};
