import { Request, Response, NextFunction } from 'express';
import { SubCategoryService } from '@/services/subCategoryService';
import type { Apibody } from '@/types/apiBody';
import type { SubCategory } from '@shared/types/subCategory';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const SubCategoryController = {
  async getAllSubCategories(
    _req: Request,
    res: Response<Apibody<SubCategory[]>>,
    next: NextFunction,
  ) {
    try {
      const subCategories = await SubCategoryService.getAllSubCategories();
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      res.status(200).json({
        code: key,
        data: subCategories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
