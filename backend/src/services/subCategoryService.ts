import { SubCategoryRepository } from '@/repositories/subCategoryRepository';

export const SubCategoryService = {
  async getAllSubCategories() {
    const subCategories = await SubCategoryRepository.findAll();
    return subCategories;
  },
};
