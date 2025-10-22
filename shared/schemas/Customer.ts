import { z } from "zod";

export const validation = z.object({
  name: z.string().nonempty("得意先名は必須です"),
  email:
    z.email("正しいメールアドレスを入力してください") ||
    z.string().nonempty("メールアドレスは必須です"),
  tel: z
    .string()
    .regex(/^\d{10,11}$/, "電話番号は10〜11桁の数字で入力してください")
    .nullable(),
});

export type Customer = z.infer<typeof validation>;
