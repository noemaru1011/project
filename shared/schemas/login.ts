import { z } from "zod";

export const validation = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "メールアドレスは必須です";
      }
      return "正しいメールアドレスの形式で入力してください";
    },
  }),

  password: z
    .string()
    .min(6, { error: "パスワードは6文字以上で入力してください" })
    .max(100, { error: "パスワードは100文字以内で入力してください" }),
});

export type LoginForm = z.infer<typeof validation>;
