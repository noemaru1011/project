import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "パスワードは6文字以上で入力してください" })
  .max(100, { message: "パスワードは100文字以内で入力してください" });

/**
 * ログインバリデーション
 */
export const LoginSchema = z.object({
  email: z.string().email({
    message: "正しいメールアドレスの形式で入力してください",
  }),
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof LoginSchema>;

/**
 * パスワード変更バリデーション
 */
export const PasswordUpdateSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    checkNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.checkNewPassword, {
    message: "新しいパスワードが一致しません",
    path: ["checkNewPassword"],
  });

export type PasswordUpdateInput = z.infer<typeof PasswordUpdateSchema>;
