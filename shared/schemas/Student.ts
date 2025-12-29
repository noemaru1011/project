import { z } from "zod";

export const validation = z.object({
  studentName: z
    .string()
    .nonempty("学生名は必須です。")
    .max(50, "学生名は50文字以内で入力してください。"),

  grade: z
    .string()
    .nonempty("学年は必須です。")
    .regex(/^[1-4]$/, "学年は1〜4で入力してください"),

  //TODO
  email: z.string().nonempty("メールアドレスは必須です。").email({
    message: "有効なメールアドレスを入力してください",
  }),

  minorCategoryId: z
    .string()
    .nonempty("小分類は必須です。")
    .regex(/^[1-4]$/, "正しい小分類を入力してください"),

  departmentId: z
    .string()
    .nonempty("学科は必須です。")
    .regex(/^[1-4]$/, "正しい学科を入力してください"),
});

export type StudentForm = z.infer<typeof validation>;

//TODO
export const updateValidation = validation.extend({
  updatedAt: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date({ message: "正しい日時を入力してください。" })
  ),
});

export type StudentUpdateForm = z.infer<typeof updateValidation>;
