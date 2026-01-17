import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '@/features/category/services/categoryService';
import type { ApiBody } from '@shared/models/common';
import type { Category } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAllCategories = async (
    _req: Request,
    res: Response<ApiBody<Category[]>>,
    next: NextFunction,
  ) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      const key: ApiMessageCode = 'FETCH_SUCCESS';
      return res.status(200).json({
        code: key,
        data: categories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };
}
