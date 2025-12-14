import { Request, Response, NextFunction } from 'express';
import { SubCategoryService } from '@/services/subCategoryService';
import { apiMessage } from '@/constants/apiMessage';

export const SubCategoryController = {
  async getAllSubCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const subCategories = await SubCategoryService.getAllSubCategories();
      res.status(200).json({
        data: subCategories,
        message: apiMessage.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
