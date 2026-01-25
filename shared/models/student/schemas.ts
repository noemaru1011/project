import { z } from "zod";

/**
 * 学生共通バリデーション定義
 */
const baseStudentFields = {
  studentName: z
    .string()
    .min(1, { error: "学生名は必須です。" })
    .max(20, { error: "学生名は20文字以内で入力してください。" }),
  email: z
    .email({
      error: "正しいメールアドレスの形式で入力してください。",
    })
    .max(255, { error: "メールアドレスは255文字以内で入力してください" }),
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
 * - 文字列で送られてきたID類を数値に変換(coerce)する
 */
export const StudentServerCreateSchema = z.object({
  ...baseStudentFields,
  grade: z.coerce.number().int().min(1).max(4),
  minorCategoryId: z.coerce.number().int(),
  departmentId: z.coerce.number().int(),
});

export const StudentServerUpdateSchema = StudentServerCreateSchema.extend({
  updatedAt: z.coerce.date(),
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
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type StudentSearchInput = z.infer<typeof StudentSearchSchema>;

export const StudentServerSearchSchema = z.object({
  grades: z.array(z.coerce.number().int().min(1).max(4)).optional(),
  categoryIds: z.array(z.coerce.number().int()).optional(),
  subCategoryIds: z.array(z.coerce.number().int()).optional(),
  minorCategoryIds: z.array(z.coerce.number().int()).optional(),
  departmentIds: z.array(z.coerce.number().int()).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type StudentServerSearchInput = z.infer<
  typeof StudentServerSearchSchema
>;
