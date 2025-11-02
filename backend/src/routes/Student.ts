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

router.post("/Create", async (req, res) => {
  try {
    const { studentName, studentEmail, departmentId, minorCategoryId, grade } =
      req.body;

    const student = await prisma.student.create({
      data: {
        studentName,
        studentEmail,
        departmentId: Number(departmentId),
        minorCategoryId: Number(minorCategoryId),
        grade: Number(grade),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.json(student);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Students" });
  }
});

export default router;
