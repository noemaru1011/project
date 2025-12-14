import { z } from "zod";

export const validation = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください"),

  statusId: z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({
        message: "状況は必須項目です。",
      })
      .int()
      .refine((v) => [1, 2, 3, 4, 5, 6, 7].includes(v), {
        message: "状況は1〜7の範囲で指定してください。",
      })
  ),

  other: z.string().max(50, "備考は50文字以内で入力してください。"),

  startTime: z.preprocess(
    (val) => new Date(val as string),
    z.date({
      message: "有効開始日は必須です。",
    })
  ),

  endTime: z.preprocess(
    (val) => (val ? new Date(val as string) : null),
    z.date({ message: "正しい日時を入力してください。" }).nullable()
  ),
});

export type HistoryForm = z.infer<typeof validation>;

export const updateValidation = validation
  .omit({
    studentIds: true,
  })
  .extend({
    updatedAt: z.preprocess(
      (val) => (val ? new Date(val as string) : undefined),
      z.date({ message: "正しい日時を入力してください。" })
    ),
  });

export type HistoryUpdateForm = z.infer<typeof updateValidation>;
