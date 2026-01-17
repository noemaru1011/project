import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import type { MinorCategory } from '@shared/models/master';

export class MinorCategoryService {
  constructor(private readonly minorCategoryRepo: MinorCategoryRepository) {}

  async getAllMinorCategories(): Promise<MinorCategory[]> {
    const minorCategories = await this.minorCategoryRepo.findAll();
    return minorCategories.map((minorCategory) => ({
      minorCategoryId: minorCategory.minorCategoryId.toString(),
      minorCategoryName: minorCategory.minorCategoryName,
    }));
  }
}
