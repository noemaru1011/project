import { z } from "zod";

export const validation = z.object({
  studentName: z
    .string()
    .min(1, { error: "学生名は必須です。" })
    .max(20, { error: "学生名は20文字以内で入力してください。" }),

  grade: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "学年は必須です。"
        : undefined,
  }),

  email: z.email({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "メールアドレスは必須です。"
        : "正しいメールアドレスの形式で入力してください。",
  }),

  minorCategoryId: z.string().min(1, { error: "小分類は必須です。" }),

  departmentId: z.string().min(1, { error: "学科は必須です。" }),
});

export type StudentForm = z.infer<typeof validation>;

export const updateValidation = validation.extend({
  updatedAt: z.string().min(1, { error: "更新日は必須です。" }),
});

export type StudentUpdateForm = z.infer<typeof updateValidation>;

//サーバーサイドのバリデーション
export const serverValidation = z.object({
  studentName: z
    .string({ error: "文字列で入力してください。" })
    .min(1, { error: "学生名は必須です。" })
    .max(20, { error: "学生名は20文字以内で入力してください。" }),

  grade: z.coerce
    .number({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "学年は必須です。";
        }
        return "学年は数字である必要があります。";
      },
    })
    .int({ error: "学年は整数である必要があります。" })
    .refine((val) => val >= 1 && val <= 4, {
      error: "学年は1〜4で入力してください。",
    }),

  email: z.email({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "メールアドレスは必須です";
      }
      return "正しいメールアドレスの形式で入力してください";
    },
  }),

  minorCategoryId: z.coerce
    .number({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "小分類は必須です。";
        }
        return "小分類は数字である必要があります。";
      },
    })
    .int({ error: "正しい小分類を入力してください。" })
    .refine((val) => val >= 1 && val <= 48, {
      error: "正しい小分類を入力してください。",
    }),

  departmentId: z.coerce
    .number({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "学科は必須です。";
        }
        return "学科は数字である必要があります。";
      },
    })
    .int({ error: "正しい学科を入力してください。" })
    .refine((val) => val >= 1 && val <= 7, {
      error: "正しい学科を入力してください。",
    }),
});

export type StudentServerForm = z.infer<typeof serverValidation>;

export const serverUpdateValidation = serverValidation.extend({
  updatedAt: z.coerce.date({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "更新日は必須です。";
      }
      return "正しい更新日を入力してください。";
    },
  }),
});

export type StudentUpdateServerForm = z.infer<typeof serverUpdateValidation>;
