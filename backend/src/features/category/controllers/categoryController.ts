import { CategoryService } from '@/features/category/services/categoryService';
import type { Category } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { asyncHandler } from '@/base/controllers/baseController';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAllCategories = asyncHandler<Category[]>(async (_req, res) => {
    const categories = await this.categoryService.getAllCategories();

    return res.status(200).json({
      code: 'FETCH_SUCCESS',
      data: categories,
      message: APIMESSAGE.FETCH_SUCCESS,
    });
  });
}
