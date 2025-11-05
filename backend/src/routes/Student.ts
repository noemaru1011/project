import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { validateBody } from "../middleware/validate";
import validation from "@shared/schemas/Student";

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

//メール送信(汎用的ではないためutilsにはしない)
const sendAccountEmail = async (email: string, password: string) => {
  try {
    await resend.emails.send({
      from: "no-reply@resend.dev",
      to: email,
      subject: "アカウント作成通知",
      text: `学生アカウントが作成されました。\n\nユーザー名: ${email}\n初回パスワード: ${password}\n\n心当たりがない場合はメールの削除をお願いします。\n本メールは送信専用のため返信できません。`,
    });
  } catch (error) {
    throw new Error("メール送信に失敗しました。");
  }
};

router.get("/Index", async (req, res) => {
  try {
    const Students = await prisma.student.findMany({
      select: {
        studentId: true,
        studentName: true,
        grade: true,
        minorCategory: {
          select: {
            minorCategoryName: true,
          },
        },
      },
    });
    res.json(Students);
  } catch (error) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

router.post("/Create", validateBody(validation), async (req, res) => {
  const { studentName, studentEmail, departmentId, minorCategoryId, grade } =
    req.body;
  try {
    // ランダムパスワード生成
    const plainPassword = generateRandomPassword();
    //パスワードハッシュ化
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

    // Passwordテーブルにも保存
    await prisma.studentPassword.create({
      data: {
        studentId: student.studentId,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    //メール送信(ハッシュ化前のパスワードを送信)
    await sendAccountEmail(studentEmail, plainPassword);
    res.status(201).json({ message: "追加完了" });
  } catch (err: any) {
    if (err.code === "P2002" && err.meta?.target?.includes("studentEmail")) {
      return res
        .status(400)
        .json({ error: "このメールアドレスはすでに登録されています" });
    }
    console.error("Create Student Error:", err); // ←これで詳細を見る
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

router.get("/View/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { studentId: id, deleteFlag: false },
    });
    if (!student)
      return (
        res
          .status(404)
          //toDo メッセージを模索中
          .json({ error: "該当する学生が見つかりませんでした" })
      );
    res.json({
      student: {
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        departmentId: student.departmentId,
        minorCategoryId: student.minorCategoryId,
        grade: student.grade,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

router.put("/Update/:id", validateBody(validation), async (req, res) => {
  const { studentName, departmentId, minorCategoryId, grade } = req.body;
  try {
    const { id } = req.params;
    await prisma.student.update({
      where: { studentId: id! },
      data: {
        studentName,
        departmentId: Number(departmentId),
        minorCategoryId: Number(minorCategoryId),
        grade: Number(grade),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ message: "更新完了" });
  } catch (err: any) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

router.post("/Delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.student.update({
      where: { studentId: id },
      data: {
        deleteFlag: true,
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ message: "削除完了" });
  } catch (err: any) {
    res.status(500).json({ error: "予期せぬエラーが発生しました" });
  }
});

export default router;
