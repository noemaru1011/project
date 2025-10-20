import { z } from "zod";

export const validation = z.object({
  name: z.string().min(1, "得意先名は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tel: z
    .string()
    .regex(/^\d{10,11}$/, "電話番号は10〜11桁の数字で入力してください")
    .nullable() // undefined ではなく null に
    .optional(),
});

export type CustomerInput = z.infer<typeof validation>;
