import { Router } from "express";
import { CategoryService } from "../service/categoryService";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "予期せぬエラーが発生しました" });
  }
});

export default router;
