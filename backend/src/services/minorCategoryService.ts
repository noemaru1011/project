import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import type { MinorCategory } from '@shared/models/master';

export const MinorCategoryService = {
  async getAllMinorCategories(): Promise<MinorCategory[]> {
    const minorCategories = await MinorCategoryRepository.findAll();
    return minorCategories.map((minorCategory) => ({
      minorCategoryId: minorCategory.minorCategoryId.toString(),
      minorCategoryName: minorCategory.minorCategoryName,
    }));
  },
};
