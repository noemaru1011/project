import { SubCategoryRepository } from '@/repositories/subCategoryRepository';
import type { SubCategory } from '@shared/models/master';

export const SubCategoryService = {
  async getAllSubCategories(): Promise<SubCategory[]> {
    const subCategories = await SubCategoryRepository.findAll();
    return subCategories.map((subCategory) => ({
      subCategoryId: subCategory.subCategoryId.toString(),
      subCategoryName: subCategory.subCategoryName,
    }));
  },
};
