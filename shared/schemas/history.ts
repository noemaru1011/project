import { z } from "zod";

export const validation = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください。"),

  statusId: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "状態は必須です。"
        : undefined,
  }),

  other: z.string().max(30, "備考は30文字以内で入力してください。").optional(),

  startTime: z.string().min(1, { error: "有効開始日は必須です。" }),

  endTime: z.string().optional(),
});

export type HistoryForm = z.infer<typeof validation>;

export const updateValidation = validation
  .omit({
    studentIds: true,
  })
  .extend({
    validFlag: z.boolean({
      error: "ture か false を選択してください。",
    }),
    updatedAt: z.string().min(1, { error: "更新日は必須です。" }),
  });

export type HistoryUpdateForm = z.infer<typeof updateValidation>;

export const serverValidation = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください"),

  statusId: z.coerce
    .number({
      error: (issue) => {
        if (issue.input === undefined || issue.input === "") {
          return "ステータスは必須です。";
        }
        return "ステータスは数字である必要があります。";
      },
    })
    .int({ error: "正しいステータスを入力してください" })
    .refine((val) => val >= 1 && val <= 7, {
      error: "正しいステータスを入力してください",
    }),

  other: z.string().max(30, "備考は30文字以内で入力してください。").optional(),

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
