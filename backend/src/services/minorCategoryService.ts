import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';

export const MinorCategoryService = {
  async getAllMinorCategories() {
    const minorCategories = await MinorCategoryRepository.findAll();
    return minorCategories;
  },
};
