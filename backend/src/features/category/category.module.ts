import { PrismaClient } from '@prisma/client';
import { CategoryController } from '@/features/category/controllers/categoryController';
import { CategoryService } from '@/features/category/services/categoryService';
import { CategoryRepository } from '@/features/category/repositories/categoryRepository';

export const createCategoryModule = (prisma: PrismaClient) => {
  const categoryRepo = new CategoryRepository(prisma);

  const categoryService = new CategoryService(categoryRepo);

  const categoryController = new CategoryController(categoryService);

  return {
    categoryController,
  };
};
