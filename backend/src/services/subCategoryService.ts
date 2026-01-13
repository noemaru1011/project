import { SubCategoryRepository } from '@/repositories/subCategoryRepository';
import type { SubCategory } from '@shared/models/master';

export class SubCategoryService {
  constructor(private subCategoryRepo: SubCategoryRepository) {}

  async getAllSubCategories(): Promise<SubCategory[]> {
    const subCategories = await this.subCategoryRepo.findAll();
    return subCategories.map((subCategory) => ({
      subCategoryId: subCategory.subCategoryId.toString(),
      subCategoryName: subCategory.subCategoryName,
    }));
  }
}
