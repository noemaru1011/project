import { z } from "zod";

export const studentBaseSchema = z.object({
  studentName: z
    .string()
    .nonempty("学生名は必須です。")
    .max(50, "学生名は50文字以内で入力してください。"),

  grade: z
    .number()
    .refine((v) => v !== undefined && v !== null, "学年は必須です。")
    .int("学年は整数で指定してください。")
    .min(1, "学年は1〜4の範囲で指定してください。")
    .max(4, "学年は1〜4の範囲で指定してください。"),

  email: z.email("メールアドレスの形式が正しくありません。"),

  minorCategoryId: z
    .number()
    .refine((v) => v !== undefined && v !== null, "小分類は必須です。")
    .int("正しい小分類を指定してください。")
    .min(1, "正しい小分類を指定してください。")
    .max(48, "正しい小分類を指定してください。"),

  departmentId: z
    .number()
    .refine((v) => v !== undefined && v !== null, "学科は必須です。")
    .int("正しい学科を指定してください。")
    .min(1, "正しい学科を指定してください。")
    .max(7, "正しい学科を指定してください。"),
});
