import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    const { studentEmail, studentPassword } = req.body;

    // 1. メールアドレスでユーザーを取得
    const student = await prisma.student.findUnique({
      where: { studentEmail: studentEmail },
    });

    if (!student) {
      return res
        .status(401)
        .json({ error: "メールアドレスかパスワードが違います" });
    }

    // 2. パスワードを取得
    const password = await prisma.studentPassword.findUnique({
      where: { studentId: student.studentId },
    });

    if (!password) {
      return res
        .status(401)
        .json({ error: "メールアドレスかパスワードが違います" });
    }

    // 3. bcrypt で比較
    const match = await bcrypt.compare(studentPassword, password.password);
    if (!match) {
      return res
        .status(401)
        .json({ error: "メールアドレスかパスワードが違います" });
    }

    // 4. 成功
    return res.json({ message: "ログイン成功", studentId: student.studentId });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

export default router;
