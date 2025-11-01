import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const Students = await prisma.student.findMany();
    res.json(Students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Students" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { studentName, departmentId, minorCategoryId, Grade } = req.body;

    const student = await prisma.student.create({
      data: {
        studentName,
        departmentId: Number(departmentId),
        minorCategoryId: Number(minorCategoryId),
        Grade: Number(Grade),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.json(student);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Students" });
  }
});

export default router;
