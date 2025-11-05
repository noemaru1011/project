import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/Login", async (req, res) => {
  try {
    const { studentEmail, studentPassword } = req.body;

    // 1. メールアドレスで学生テーブルからユーザーIDを取得
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
      return (
        res
          .status(401)
          //パスワードが登録されていない旨は伝えない,自動生成されるはず
          .json({ error: "メールアドレスかパスワードが違います" })
      );
    }

    // 3. bcrypt で比較
    const match = await bcrypt.compare(studentPassword, password.password);
    if (!match) {
      return res
        .status(401)
        .json({ error: "メールアドレスかパスワードが違います" });
    }

    // 4. 成功
    const token = jwt.sign({ studentEmail }, JWT_SECRET!, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 本番は HTTPS
      sameSite: "strict",
      maxAge: 3600 * 1000, // 1時間
    });

    res.json({ message: "ログイン成功" });
  } catch (err: any) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

export default router;
