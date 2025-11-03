import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY!);

// ランダムパスワード生成
function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

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

    // ランダムパスワード生成
    const plainPassword = generateRandomPassword();
    const password = await bcrypt.hash(plainPassword, 10);

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

    // Passwordテーブルに保存
    await prisma.studentPassword.create({
      data: {
        studentId: student.studentId,
        password,
        createdAt: new Date(),
      },
    });

    //メール送信
    const result = await resend.emails.send({
      from: "no-reply@resend.dev", //無料ドメイン
      to: studentEmail,
      subject: "アカウント作成通知",
      text: `学生アカウントが作成されました。\n\nユーザー名: ${studentEmail}\n初回パスワード: ${plainPassword}\nログイン後は必ずパスワードを変更してください。`,
    });
    console.log("Resend result:", result);
    res.json({ student });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Students" });
  }
});

router.get("/View/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { studentId: id },
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

router.put("/Update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, studentEmail, departmentId, minorCategoryId, grade } =
      req.body;

    const updatedStudent = await prisma.student.update({
      where: { studentId: id },
      data: {
        studentName,
        studentEmail,
        departmentId: Number(departmentId),
        minorCategoryId: Number(minorCategoryId),
        grade: Number(grade),
        updatedAt: new Date(),
      },
    });

    res.json(updatedStudent);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to update Student" });
  }
});

export default router;
