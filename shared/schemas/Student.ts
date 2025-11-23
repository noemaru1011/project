import { z } from "zod";

const validMinorCategoryIds = Array.from({ length: 48 }, (_, i) => i + 1);
export const validation = z.object({
  studentName: z
    .string()
    .nonempty("学生名は必須です。")
    .max(50, "学生名は50文字以内で入力してください。"),

  grade: z
    .string()
    .nonempty("学年は必須です。")
    .transform((val) => Number(val))
    .refine((val) => [1, 2, 3, 4].includes(val), {
      message: "学年は1,2,3,4の範囲で指定してください。",
    }),

  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "有効なメールアドレスを入力してください",
    }),

  minorCategoryId: z
    .string()
    .nonempty("小分類名は必須です。")
    .transform((val) => Number(val))
    .refine((val) => validMinorCategoryIds.includes(val), {
      message: "存在する小分類名を選択してください",
    }),

  departmentId: z
    .string()
    .nonempty("学科名は必須です。")
    .transform((val) => Number(val))
    .refine((val) => [1, 2, 3, 4, 5, 6, 7].includes(val), {
      message: "存在する学科名を選択してください。",
    }),
});

export const queryValidation = z.object({
  categories: z.array(z.number().positive()).optional(),
  subCategories: z.array(z.number().positive()).optional(),
  minorCategories: z.array(z.number().positive()).optional(),
  departmentIds: z.array(z.number().positive()).optional(),
  grades: z.array(z.number().int().min(1).max(4)).optional(),
});
