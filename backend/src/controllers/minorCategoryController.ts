import { Request, Response } from "express";
import { MinorCategoryService } from "@/services/minorCategoryService";

export const MinorCategoryController = {
  async getAllMinorCategories(req: Request, res: Response) {
    try {
      const minorcategories =
        await MinorCategoryService.getAllMinorCategories();
      res.json(minorcategories);
    } catch (error) {
      res.status(500).json({ message: "予期せぬエラーが発生しました" });
    }
  },
};
