import { z } from "zod";

export const validation = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください"),

  statusId: z.string({
    error: (issue) =>
      issue.input === undefined || issue.input === ""
        ? "状態は必須です。"
        : undefined,
  }),

  other: z.string().max(20, "備考は20文字以内で入力してください。"),

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
      message: "ture か false を選択してください。",
    }),
    updatedAt: z.string({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "更新日は必須です。"
          : "正しい日付を入力してください。",
    }),
  });

export type HistoryUpdateForm = z.infer<typeof updateValidation>;
