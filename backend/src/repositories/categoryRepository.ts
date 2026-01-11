import { PrismaClient } from '@prisma/client';
import type { Category } from '@shared/types/category';

const prisma = new PrismaClient();

export const CategoryRepository = {
  async findAll(): Promise<Category[]> {
    const rows = await prisma.category.findMany({
      select: {
        categoryId: true,
        categoryName: true,
      },
      orderBy: { categoryId: 'asc' },
    });
    return rows.map((row) => ({
      categoryId: row.categoryId.toString(),
      categoryName: row.categoryName,
    }));
  },
};
