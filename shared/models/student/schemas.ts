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
    .max(100, { error: "パスワードは100文字以内で入力してください。" }),
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
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "学年は必須です。"
          : "学年は数値を入力してください。",
    })
    .int({
      error: "学年は整数を入力してくださ。。",
    })
    .min(1, { error: "学年は1〜4で入力してください。" })
    .max(4, { error: "学年は1〜4で入力してください。" }),
  minorCategoryId: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "小分類は必須です。"
          : "小分類は数値を入力してください。",
    })
    .int({
      error: "小分類は整数を入力してください。",
    }),
  departmentId: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "学科は必須です。"
          : "学科は数値を入力してください。",
    })
    .int({
      error: "学科は整数を入力してください。",
    }),
});

export const StudentServerUpdateSchema = StudentServerCreateSchema.extend({
  updatedAt: z.coerce.date({
    error: (issue) =>
      issue.input === undefined
        ? "更新日は必須です"
        : "正しい更新日を入力してください。",
  }),
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
        .number({
          error: "学年は数値を入力してください。",
        })
        .int({
          error: "学年は整数を入力してくださ。。",
        })
        .min(1, { error: "学年は1〜4で入力してください。" })
        .max(4, { error: "学年は1〜4で入力してください。" })
    )
    .optional(),
  categoryIds: z
    .array(
      z.coerce
        .number({
          error: "大分類は数値を入力してください。",
        })
        .int({
          error: "大分類は整数を入力してください。",
        })
    )
    .optional(),
  subCategoryIds: z
    .array(
      z.coerce
        .number({
          error: "中分類は数値を入力してください。",
        })
        .int({
          error: "中分類は整数を入力してください。",
        })
    )
    .optional(),
  minorCategoryIds: z
    .array(
      z.coerce
        .number({
          error: "小分類は数値を入力してください。",
        })
        .int({
          error: "小分類は整数を入力してください。",
        })
    )
    .optional(),
  departmentIds: z
    .array(
      z.coerce
        .number({
          error: "学科は数値を入力してください。",
        })
        .int({
          error: "学科は整数を入力してください。",
        })
    )
    .optional(),
});

export type StudentServerSearchInput = z.infer<
  typeof StudentServerSearchSchema
>;
