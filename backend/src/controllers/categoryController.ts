import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '@/services/categoryService';
import type { ApiBody } from '@shared/models/common';
import type { Category } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export const CategoryController = {
  async getAllCategories(_req: Request, res: Response<Apibody<Category[]>>, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      const key: ApiMessageCode = 'FETCH_SUCCESS';
      return res.status(200).json({
        code: key,
        data: categories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
