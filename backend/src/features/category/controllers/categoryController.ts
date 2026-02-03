import { CategoryService } from '@/features/category/services/categoryService';
import type { Category } from '@shared/models/master';
import { BaseController } from '@/base/controllers/baseController';

export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  getAllCategories = this.asyncHandler<Category[]>(async (_req, res) => {
    const categories = await this.categoryService.getAllCategories();

    return this.ok(res, categories);
  });
}
