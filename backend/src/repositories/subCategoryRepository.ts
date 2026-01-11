import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const SubCategoryRepository = {
  async findAll() {
    return await prisma.subCategory.findMany({
      select: {
        subCategoryId: true,
        subCategoryName: true,
      },
      orderBy: { subCategoryId: 'asc' },
    });
  },
};
