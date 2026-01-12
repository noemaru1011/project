import { z } from "zod";

/**
 * 学生共通バリデーション定義
 */
const baseStudentFields = {
  studentName: z
    .string()
    .min(1, { error: "学生名は必須です。" })
    .max(20, { error: "学生名は20文字以内で入力してください。" }),
  email: z.email({
    error: "正しいメールアドレスの形式で入力してください。",
  }),
};

/**
 * フロントエンド用: 新規作成・編集
 * - ID類はセレクトボックスから来るため文字列として扱う
 */
export const StudentCreateSchema = z.object({
  ...baseStudentFields,
  grade: z.string().min(1, { error: "学年は必須です。" }),
  minorCategoryId: z.string().min(1, { error: "小分類は必須です。" }),
  departmentId: z.string().min(1, { error: "学科は必須です。" }),
});

export const StudentUpdateSchema = StudentCreateSchema.extend({
  updatedAt: z.string().min(1, { error: "更新日は必須です。" }),
});

export type StudentCreateInput = z.infer<typeof StudentCreateSchema>;
export type StudentUpdateInput = z.infer<typeof StudentUpdateSchema>;

/**
 * サーバーサイド用: DB保存前のパース・バリデーション
 * - 文字列で送られてきたID類を数値に変換(coerce)し、範囲チェックを行う
 */
export const StudentServerCreateSchema = z.object({
  ...baseStudentFields,
  grade: z.coerce
    .number()
    .int()
    .min(1, "学年は1〜4で入力してください。")
    .max(4, "学年は1〜4で入力してください。"),
  minorCategoryId: z.coerce
    .number()
    .int()
    .min(1, "正しい小分類を入力してください。")
    .max(48, "正しい小分類を入力してください。"),
  departmentId: z.coerce
    .number()
    .int()
    .min(1, "正しい学科を入力してください。")
    .max(7, "正しい学科を入力してください。"),
});

export const StudentServerUpdateSchema = StudentServerCreateSchema.extend({
  updatedAt: z.coerce.date({ error: "正しい更新日を入力してください。" }),
});

export type StudentServerCreateInput = z.infer<
  typeof StudentServerCreateSchema
>;
export type StudentServerUpdateInput = z.infer<
  typeof StudentServerUpdateSchema
>;

/**
 * 学生検索クエリバリデーション
 */
export const StudentSearchSchema = z.object({
  grades: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  subCategoryIds: z.array(z.string()).optional(),
  minorCategoryIds: z.array(z.string()).optional(),
  departmentIds: z.array(z.string()).optional(),
});

export type StudentSearchInput = z.infer<typeof StudentSearchSchema>;

export const StudentServerSearchSchema = z.object({
  grades: z
    .array(
      z.coerce
        .number()
        .int({ error: "学年は整数である必要があります。" })
        .min(1, "学年は1〜4で入力してください。")
        .max(4, "学年は1〜4で入力してください。")
    )
    .optional(),
  categoryIds: z
    .array(
      z.coerce
        .number()
        .int()
        .min(1, "正しい大分類を入力してください")
        .max(4, "正しい大分類を入力してください")
    )
    .optional(),
  subCategoryIds: z
    .array(
      z.coerce
        .number()
        .int()
        .min(1, "正しい中分類を入力してください")
        .max(16, "正しい中分類を入力してください")
    )
    .optional(),
  minorCategoryIds: z
    .array(
      z.coerce
        .number()
        .int()
        .min(1, "正しい小分類を入力してください")
        .max(48, "正しい小分類を入力してください")
    )
    .optional(),
  departmentIds: z
    .array(
      z.coerce
        .number()
        .int()
        .min(1, "正しい学科を入力してください")
        .max(7, "正しい学科を入力してください")
    )
    .optional(),
});

export type StudentServerSearchInput = z.infer<
  typeof StudentServerSearchSchema
>;
