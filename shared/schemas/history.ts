import { z } from "zod";

export const validation = z.object({
  other: z.string().max(200, "備考は200文字以内で入力してください。"),

  startTime: z.string().optional(),

  endTime: z.string().optional(),
});

export type HistoryFormValues = z.infer<typeof validation>;
