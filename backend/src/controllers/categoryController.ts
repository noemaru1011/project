import { Request, Response } from 'express';
import { CategoryService } from '@/services/categoryService';

export const CategoryController = {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json({
        data: categories,
        message: '取得成功',
      });
    } catch (error) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },
};
