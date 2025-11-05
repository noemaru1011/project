import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const SubCategorys = await prisma.subCategory.findMany({
      select: {
        subCategoryId: true,
        subCategoryName: true,
      },
    });
    res.json(SubCategorys);
  } catch (error) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

export default router;
