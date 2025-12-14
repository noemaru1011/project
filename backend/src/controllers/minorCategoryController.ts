import { Request, Response, NextFunction } from 'express';
import { MinorCategoryService } from '@/services/minorCategoryService';
import { apiMessage } from '@/constants/apiMessage';

export const MinorCategoryController = {
  async getAllMinorCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const minorcategories = await MinorCategoryService.getAllMinorCategories();
      res.json({
        data: minorcategories,
        message: apiMessage.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
