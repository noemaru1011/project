import { z } from "zod";

export const validation = z.object({
  studentId: z.string().uuid().optional(),

  studentName: z
    .string()
    .min(1, "学生名は必須です。")
    .max(50, "学生名は50文字以内で入力してください。"),

  grade: z
    .number()
    .min(1, "学年は必須です。")
    .int("整数で入力してください。")
    .refine((val) => [1, 2, 3, 4].includes(val), {
      message: "学年は1〜4の範囲で指定してください。",
    }),

  minorCategoryId: z.string().min(1, "小分類IDは必須です。"),

  departmentId: z.string().min(1, "学科IDは必須です。"),
});

export type Student = z.infer<typeof validation>;

export const studentQuery = z.object({
  category: z.string().optional(),
  subCategory: z.string().optional(),
  minorCategory: z.string().optional(),
  studentName: z.string().optional(),
  departmentId: z.coerce.number().optional(),
  grade: z.coerce.number().optional(),
});

export type StudentQuery = z.infer<typeof studentQuery>;
