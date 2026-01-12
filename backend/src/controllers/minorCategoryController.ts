import { Request, Response, NextFunction } from 'express';
import { MinorCategoryService } from '@/services/minorCategoryService';
import type { ApiBody } from '@shared/models/common';
import type { MinorCategory } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export const MinorCategoryController = {
  async getAllMinorCategories(
    _req: Request,
    res: Response<ApiBody<MinorCategory[]>>,
    next: NextFunction,
  ) {
    try {
      const minorcategories = await MinorCategoryService.getAllMinorCategories();
      const key: ApiMessageCode = 'FETCH_SUCCESS';
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
