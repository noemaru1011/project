import { Router } from "express";
import { MinorCategoryController } from "@/controllers/minorCategoryController";

const router = Router();

router.get("/", MinorCategoryController.getAllMinorCategories);

export default router;
