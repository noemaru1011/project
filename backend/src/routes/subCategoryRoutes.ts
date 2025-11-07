import { Router } from "express";
import { SubCategoryController } from "@/controllers/SubCategoryController";

const router = Router();

router.get("/", SubCategoryController.getAllSubCategories);

export default router;
