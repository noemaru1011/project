import { z } from "zod";

export const validation = z.object({
  studentName: z
    .string({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "学生名は必須です。"
          : undefined,
    })
    .max(50, { error: "学生名は50文字以内で入力してください。" }),

  grade: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "学年は必須です。"
        : undefined,
  }),

  email: z.email({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "メールアドレスは必須です";
      }
      return "正しいメールアドレスの形式で入力してください";
    },
  }),

  minorCategoryId: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "小分類は必須です。"
        : undefined,
  }),

  departmentId: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "学科は必須です。"
        : undefined,
  }),
});

export type StudentForm = z.infer<typeof validation>;

export const updateValidation = validation.extend({
  updatedAt: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "更新日は必須です。"
        : "正しい更新日を入力してください。",
  }),
});

export type StudentUpdateForm = z.infer<typeof updateValidation>;

export const serverValidation = z.object({
  studentName: z
    .string({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "学生名は必須です。"
          : undefined,
    })
    .max(50, { error: "学生名は50文字以内で入力してください。" }),

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
    .int({ error: "小分類は整数である必要があります。" })
    .refine((val) => val >= 1 && val <= 48, {
      error: "小分類は1〜4で入力してください。",
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
    .int({ error: "学科は整数である必要があります。" })
    .refine((val) => val >= 1 && val <= 7, {
      error: "学科は1〜4で入力してください。",
    }),
});

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
