import { CategoryRepository } from '@/repositories/categoryRepository';
import type { Category } from '@shared/types/category';

export const CategoryService = {
  async getAllCategories(): Promise<Category[]> {
    const categories = await CategoryRepository.findAll();
    return categories.map((Category) => ({
      categoryId: Category.categoryId.toString(),
      categoryName: Category.categoryName,
    }));
  },
};
