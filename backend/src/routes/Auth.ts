import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Login", async (req, res) => {
  const { studentNumber, password } = req.body;
  try {
    const Departments = await prisma.department.findMany();
    res.json(Departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Departments" });
  }
});

export default router;
