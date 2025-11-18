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
};
