import { Request, Response, NextFunction } from 'express';
import { MinorCategoryService } from '@/features/minorCategory/services/minorCategoryService';
import type { ApiBody } from '@shared/models/common';
import type { MinorCategory } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export class MinorCategoryController {
  constructor(private readonly minorCategoryService: MinorCategoryService) {}

  getAllMinorCategories = async (
    _req: Request,
    res: Response<ApiBody<MinorCategory[]>>,
    next: NextFunction,
  ) => {
    try {
      const minorcategories = await this.minorCategoryService.getAllMinorCategories();
      res.status(200).json({
        code: 'FETCH_SUCCESS',
        data: minorcategories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };
}
