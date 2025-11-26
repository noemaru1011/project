import { z } from "zod";

const strongPassword = z
  .string()
  .min(6, "パスワードは6文字以上で入力してください")
  .max(100, "パスワードは100文字以内で入力してください")
  .regex(/[a-z]/, "小文字を1文字以上含めてください")
  .regex(/[A-Z]/, "大文字を1文字以上含めてください")
  .regex(/[0-9]/, "数字を1文字以上含めてください")
  .regex(/[^A-Za-z0-9]/, "記号を1文字以上含めてください");

export const validation = z
  .object({
    oldPassword: z
      .string()
      .min(6, "パスワードは6文字以上で入力してください")
      .max(100, "パスワードは100文字以内で入力してください"),

    newPassword: strongPassword,
    checkNewPassword: strongPassword,
  })
  .refine((data) => data.newPassword === data.checkNewPassword, {
    message: "新しいパスワードが一致しません",
    path: ["checkNewPassword"], // どのフィールドにエラーを表示するか
  });

export type Password = z.infer<typeof validation>;
