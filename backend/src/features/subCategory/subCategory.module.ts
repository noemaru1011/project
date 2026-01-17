import { PrismaClient } from '@prisma/client';
import { SubCategoryController } from '@/features/subCategory/controllers/subCategoryController';
import { SubCategoryService } from '@/features/subCategory/services/subCategoryService';
import { SubCategoryRepository } from '@/features/subCategory/repositories/subCategoryRepository';

export const createSubCategoryModule = (prisma: PrismaClient) => {
  const subCategoryRepo = new SubCategoryRepository(prisma);

  const subCategoryService = new SubCategoryService(subCategoryRepo);

  const subCategoryController = new SubCategoryController(subCategoryService);

  return {
    subCategoryController,
  };
};
