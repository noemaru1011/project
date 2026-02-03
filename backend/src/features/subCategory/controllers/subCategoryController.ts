import { SubCategoryService } from '@/features/subCategory/services/subCategoryService';
import type { SubCategory } from '@shared/models/master';
import { BaseController } from '@/base/controllers/baseController';

export class SubCategoryController extends BaseController {
  constructor(private readonly subCategoryService: SubCategoryService) {
    super();
  }

  getAllSubCategories = this.asyncHandler<SubCategory[]>(async (_req, res) => {
    const subCategories = await this.subCategoryService.getAllSubCategories();

    return this.ok(res, subCategories);
  });
}
