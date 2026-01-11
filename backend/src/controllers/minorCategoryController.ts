import { Request, Response, NextFunction } from 'express';
import { MinorCategoryService } from '@/services/minorCategoryService';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const MinorCategoryController = {
  async getAllMinorCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const minorcategories = await MinorCategoryService.getAllMinorCategories();
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      res.json({
        code: key,
        data: minorcategories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
