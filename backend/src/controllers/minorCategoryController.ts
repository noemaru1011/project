import { Request, Response, NextFunction } from 'express';
import { MinorCategoryService } from '@/services/minorCategoryService';
import { APIMESSAGE } from '@/constants/apiMessage';

export const MinorCategoryController = {
  async getAllMinorCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const minorcategories = await MinorCategoryService.getAllMinorCategories();
      res.json({
        data: minorcategories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
