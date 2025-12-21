import { z } from "zod";

const strongPassword = z
  .string()
  .min(6, "パスワードは6文字以上で入力してください")
  .max(100, "パスワードは100文字以内で入力してください");

export const validation = z
  .object({
    oldPassword: strongPassword,
    newPassword: strongPassword,
    checkNewPassword: strongPassword,
  })
  .refine((data) => data.newPassword === data.checkNewPassword, {
    message: "新しいパスワードが一致しません",
    path: ["checkNewPassword"], // どのフィールドにエラーを表示するか
  });

export type PasswordForm = z.infer<typeof validation>;
