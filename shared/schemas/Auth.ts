import { z } from "zod";

export const validation = z.object({
  studentEmail: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("有効なメールアドレスを入力してください"),

  studentPassword: z
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .max(100, "パスワードは100文字以内で入力してください"),
});

export type Auth = z.infer<typeof validation>;
