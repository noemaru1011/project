import { Request, Response, NextFunction } from 'express';
import { SubCategoryService } from '@/services/subCategoryService';
import type { ApiBody } from '@shared/models/common';
import type { SubCategory } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';

export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  getAllSubCategories = async (
    _req: Request,
    res: Response<ApiBody<SubCategory[]>>,
    next: NextFunction,
  ) => {
    try {
      const subCategories = await this.subCategoryService.getAllSubCategories();
      const key: ApiMessageCode = 'FETCH_SUCCESS';
      res.status(200).json({
        code: key,
        data: subCategories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };
}
