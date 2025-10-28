import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const Categorys = await prisma.category.findMany();
    res.json(Categorys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Categorys" });
  }
});

export default router;
