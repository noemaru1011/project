import { z } from "zod";

export const validation = z.object({
  StatusId: z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === "") {
        return undefined;
      }
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z
      .any()
      .refine((v) => v !== undefined, {
        message: "状況は必須項目です。",
      })
      .refine((v) => typeof v === "number", {
        message: "状況は数値で指定してください。",
      })
      .refine((v) => [1, 2, 3, 4, 5, 6, 7].includes(v as number), {
        message: "状況は1〜4の範囲で指定してください。",
      })
  ),

  other: z.string().max(200, "備考は200文字以内で入力してください。"),

  startTime: z
    .string()
    .nonempty("有効開始日は必須です。")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "正しい日時を入力してください。",
    }),

  endTime: z.string().optional(),
});

export type HistoryForm = z.infer<typeof validation>;
