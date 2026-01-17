import { PrismaClient } from '@prisma/client';
import { MinorCategoryController } from '@/features/minorCategory/controllers/minorCategoryController';
import { MinorCategoryService } from '@/features/minorCategory/services/minorCategoryService';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';

export const createMinorCategoryModule = (prisma: PrismaClient) => {
  const minorCategoryRepo = new MinorCategoryRepository(prisma);

  const minorCategoryService = new MinorCategoryService(minorCategoryRepo);

  const minorCategoryController = new MinorCategoryController(minorCategoryService);

  return {
    minorCategoryController,
  };
};
