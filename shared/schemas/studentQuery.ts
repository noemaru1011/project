import { z } from "zod";

export const validation = z.object({
  grades: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  subCategoryIds: z.array(z.string()).optional(),
  minorCategoryIds: z.array(z.string()).optional(),
  departmentIds: z.array(z.string()).optional(),
});

export type StudentQueryForm = z.infer<typeof validation>;

export const serverValidation = z.object({
  grades: z
    .array(
      z.coerce
        .number()
        .int({ error: "学年は整数である必要があります。" })
        .refine((val) => val >= 1 && val <= 4, {
          error: "学年は1〜4で入力してください。",
        })
    )
    .optional(),

  categoryIds: z
    .array(
      z.coerce
        .number()
        .int({ error: "正しい大分類を入力してください" })
        .refine((val) => val >= 1 && val <= 4, {
          error: "正しい大分類を入力してください",
        })
    )
    .optional(),

  subCategoryIds: z
    .array(
      z.coerce
        .number()
        .int({ error: "正しい中分類を入力してください" })
        .refine((val) => val >= 1 && val <= 16, {
          error: "正しい中分類を入力してください",
        })
    )
    .optional(),

  minorCategoryIds: z
    .array(
      z.coerce
        .number()
        .int({ error: "正しい小分類を入力してください" })
        .refine((val) => val >= 1 && val <= 48, {
          error: "正しい小分類を入力してください",
        })
    )
    .optional(),

  departmentIds: z
    .array(
      z.coerce
        .number()
        .int({ error: "正しい学科を入力してください" })
        .refine((val) => val >= 1 && val <= 7, {
          error: "正しい学科を入力してください",
        })
    )
    .optional(),
});

export type StudentQuerySeverForm = z.infer<typeof serverValidation>;
