import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const Status = await prisma.status.findMany();
    res.json(Status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Status" });
  }
});

export default router;
