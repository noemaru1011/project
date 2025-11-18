import { Request, Response } from 'express';
import { SubCategoryService } from '@/services/subCategoryService';

export const SubCategoryController = {
  async getAllSubCategories(req: Request, res: Response) {
    try {
      const subCategories = await SubCategoryService.getAllSubCategories();
      res.json(subCategories);
    } catch (error) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },
};
