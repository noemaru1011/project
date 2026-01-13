import { CategoryRepository } from '@/repositories/categoryRepository';
import type { Category } from '@shared/models/master';

export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepo.findAll();
    return categories.map((Category) => ({
      categoryId: Category.categoryId.toString(),
      categoryName: Category.categoryName,
    }));
  }
}
