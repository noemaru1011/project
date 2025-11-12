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

  //   newPassword2: z
  //     .string()
  //     .min(6, "パスワードは6文字以上で入力してください")
  //     .max(100, "パスワードは100文字以内で入力してください"),
  // })
  // .refine((data) => data.newPassword1 === data.newPassword2, {
  //   message: "新しいパスワードが一致しません",
  //   path: ["newPassword2"], // どのフィールドにエラーを表示するか
});

export type Password = z.infer<typeof validation>;
