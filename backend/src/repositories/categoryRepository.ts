import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const CategoryRepository = {
  async findAll() {
    return await prisma.category.findMany({
      select: {
        categoryId: true,
        categoryName: true,
      },
      orderBy: { categoryId: 'asc' },
    });
  },
};
