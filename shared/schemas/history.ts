import { z } from "zod";

export const validation = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください"),

  statusId: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "状態は必須です。"
        : undefined,
  }),

  other: z.string().max(30, "備考は30文字以内で入力してください。"),

  startTime: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "更新日は必須です。"
        : "正しい日付を入力してください。",
  }),

  endTime: z.string().optional(),
});

export type HistoryForm = z.infer<typeof validation>;

export const updateValidation = validation
  .omit({
    studentIds: true,
  })
  .extend({
    validFlag: z.coerce.boolean({
      error: "ture か false を選択してください。",
    }),
    updatedAt: z.string({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "更新日は必須です。"
          : "正しい日付を入力してください。",
    }),
  });

export type HistoryUpdateForm = z.infer<typeof updateValidation>;

export const serverValidation = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください"),

  statusId: z.coerce
    .number({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "状況は必須です。";
        }
        return "状況は数字である必要があります。";
      },
    })
    .int({ error: "状況は整数である必要があります。" })
    .refine((val) => val >= 1 && val <= 7, {
      error: "状況は1〜7で入力してください。",
    }),

  other: z.string().max(30, "備考は30文字以内で入力してください。"),

  startTime: z.coerce.date({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "有効開始日は必須です。";
      }
      return "正しい有効開始日を入力してください。";
    },
  }),

  endTime: z.coerce.date().optional(),
});

export const serverUpdateValidation = serverValidation
  .omit({
    studentIds: true,
  })
  .extend({
    validFlag: z.coerce.boolean({
      error: "ture か false を選択してください。",
    }),
    updatedAt: z.coerce.date({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "更新日は必須です。";
        }
        return "正しい更新日を入力してください。";
      },
    }),
  });
