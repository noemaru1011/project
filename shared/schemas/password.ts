import { z } from "zod";

export const validation = z.object({
  oldPassword: z
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .max(100, "パスワードは100文字以内で入力してください"),

  newPassword: z
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .max(100, "パスワードは100文字以内で入力してください"),
});

export type Password = z.infer<typeof validation>;
