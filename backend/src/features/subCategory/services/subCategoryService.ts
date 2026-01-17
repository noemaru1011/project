import { SubCategoryRepository } from '@/features/subCategory/repositories/subCategoryRepository';
import type { SubCategory } from '@shared/models/master';

export class SubCategoryService {
  constructor(private readonly subCategoryRepo: SubCategoryRepository) {}

  async getAllSubCategories(): Promise<SubCategory[]> {
    const subCategories = await this.subCategoryRepo.findAll();
    return subCategories.map((subCategory) => ({
      subCategoryId: subCategory.subCategoryId.toString(),
      subCategoryName: subCategory.subCategoryName,
    }));
  }
}
