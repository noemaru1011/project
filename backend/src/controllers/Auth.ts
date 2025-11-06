import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { studentEmail, studentPassword } = req.body;

    // 1. メールアドレスで学生テーブルからユーザーIDを取得
    const student = await prisma.student.findUnique({
      where: { studentEmail: studentEmail },
    });

    if (!student) {
      return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "メールアドレスかパスワードが違います",
      });
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
          .json({
            code: "INVALID_CREDENTIALS",
            message: "メールアドレスかパスワードが違います",
          })
      );
    }

    // 3. bcrypt で比較
    const match = await bcrypt.compare(studentPassword, password.password);
    if (!match) {
      return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "メールアドレスかパスワードが違います",
      });
    }

    // 4. 成功
    const token = jwt.sign({ studentEmail }, JWT_SECRET!, { expiresIn: "1h" });
    const csrfToken = crypto.randomBytes(32).toString("hex");
    (req as any).session.csrfToken = csrfToken;
    console.log("sessionToken :" + (req as any).session.csrfToken);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 本番は HTTPS
      sameSite: "strict",
      maxAge: 3600 * 1000, // 1時間
    });

    res.json({ message: "ログイン成功", csrfToken });
  } catch (err: any) {
    res.status(500).json({ message: "予期せぬエラーが発生しました" });
  }
});

export default router;
