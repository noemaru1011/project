import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const SubCategorys = await prisma.subCategory.findMany();
    res.json(SubCategorys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch SubCategorys" });
  }
});

export default router;
