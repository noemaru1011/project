import { z } from "zod";

export const validation = z.object({
  studentName: z
    .string({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "学生名は必須です。";
        }
        return "正しい入力をしてください。";
      },
    })
    .max(50, { error: "学生名は50文字以内で入力してください。" }),

  grade: z
    .string({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "学年は必須です。";
        }
        return "学年は1〜4で入力してください。";
      },
    })
    .regex(/^[1-4]$/, { error: "学年は1〜4で入力してください。" }),

  email: z.email({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "メールアドレスは必須です";
      }
      return "正しいメールアドレスの形式で入力してください";
    },
  }),

  minorCategoryId: z
    .string({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "小分類は必須です。";
        }
        return "正しい小分類を入力してください。";
      },
    })
    .regex(/^[1-48]$/, { error: "正しい小分類を入力してください。" }),

  departmentId: z
    .string({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "学科は必須です。";
        }
        return "正しい学科を入力してください。";
      },
    })
    .regex(/^[1-7]$/, { error: "正しい学科を入力してください。" }),
});

export type StudentForm = z.infer<typeof validation>;

//TODO
export const updateValidation = validation.extend({
  updatedAt: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date({ message: "正しい日時を入力してください。" })
  ),
});

export type StudentUpdateForm = z.infer<typeof updateValidation>;
