import { z } from "zod";

const validMinorCategoryIds = Array.from({ length: 48 }, (_, i) => i + 1);
const validation = z.object({
  studentName: z
    .string()
    .nonempty("学生名は必須です。")
    .max(50, "学生名は50文字以内で入力してください。"),

  grade: z
    .string()
    .nonempty("学年は必須です。")
    .transform((val) => Number(val))
    .refine((val) => [1, 2, 3, 4].includes(val), {
      message: "学年は1〜4の範囲で指定してください。",
    }),

  studentEmail: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("有効なメールアドレスを入力してください"),

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

export default validation;
export type Student = z.infer<typeof validation>;

export const studentQuery = z.object({
  studentId: z.string(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  minorCategory: z.string().optional(),
  studentName: z.string().optional(),
  departmentId: z.coerce.number().optional(),
  grade: z.coerce.number().optional(),
});

export type StudentQuery = z.infer<typeof studentQuery>;
