import { z } from "zod";

export const validation = z.object({
  studentNumber: z
    .string()
    .min(1, "学生番号を入力してください")
    .max(20, "学生番号は20文字以内で入力してください"),
  password: z
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .max(100, "パスワードは100文字以内で入力してください"),
});

export type Auth = z.infer<typeof validation>;

export const AuthLabels: Auth = {
  studentNumber: "学生番号",
  password: "パスワード",
};
