import { z } from "zod";

const validMinorCategoryIds = Array.from({ length: 48 }, (_, i) => i + 1);
export const validation = z.object({
  studentName: z
    .string()
    .nonempty("学生名は必須です。")
    .max(50, "学生名は50文字以内で入力してください。"),

  grade: z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === "") {
        return undefined;
      }
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z
      .any()
      .refine((v) => v !== undefined, {
        message: "学年は必須項目です。",
      })
      .refine((v) => typeof v === "number", {
        message: "学年は数値で指定してください。",
      })
      .refine((v) => [1, 2, 3, 4].includes(v as number), {
        message: "学年は1〜4の範囲で指定してください。",
      })
  ),

  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "有効なメールアドレスを入力してください",
    }),

  minorCategoryId: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .refine((v) => validMinorCategoryIds.includes(v), {
        message: "存在する小分類名を選択してください",
      })
  ),

  departmentId: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .refine((v) => [1, 2, 3, 4, 5, 6, 7].includes(v), {
        message: "存在する学科名を選択してください。",
      })
  ),
});

export type StudentForm = z.infer<typeof validation>;

export const updateValidation = validation
  .omit({
    email: true,
  })
  .extend({
    updatedAt: z.preprocess(
      (val) => (val ? new Date(val as string) : undefined),
      z.date({ message: "正しい日時を入力してください。" })
    ),
  });

export type StudentUpdateForm = z.infer<typeof updateValidation>;
