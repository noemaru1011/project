import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '@/services/categoryService';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const CategoryController = {
  async getAllCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      const key: ApiMessageKey = 'FETCH_SUCCESS';
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
