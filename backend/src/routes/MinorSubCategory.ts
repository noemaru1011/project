import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const MinorSubCategorys = await prisma.minorCategory.findMany({
      select: {
        minorCategoryId: true,
        minorCategoryName: true,
      },
    });
    res.json(MinorSubCategorys);
  } catch (error) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

export default router;
