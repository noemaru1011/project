import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const MinorSubCategorys = await prisma.minorCategory.findMany();
    res.json(MinorSubCategorys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch MinorSubCategorys" });
  }
});

export default router;
