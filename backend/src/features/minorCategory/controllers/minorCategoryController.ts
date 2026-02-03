import { MinorCategoryService } from '@/features/minorCategory/services/minorCategoryService';
import type { MinorCategory } from '@shared/models/master';
import { BaseController } from '@/base/controllers/baseController';

export class MinorCategoryController extends BaseController {
  constructor(private readonly minorCategoryService: MinorCategoryService) {
    super();
  }

  getAllMinorCategories = this.asyncHandler<MinorCategory[]>(async (_req, res) => {
    const minorCategories = await this.minorCategoryService.getAllMinorCategories();

    return this.ok(res, minorCategories);
  });
}
