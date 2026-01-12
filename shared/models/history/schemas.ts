import { z } from "zod";

/**
 * 履歴共通フィールド
 */
const baseHistoryFields = {
  statusId: z.string().min(1, "状態は必須です。"),
  other: z.string().max(30, "備考は30文字以内で入力してください。").default(""),
  startTime: z.string().min(1, "有効開始日は必須です。"),
  endTime: z.string().optional(),
};

/**
 * フロントエンド用: 新規作成・編集
 */
export const HistoryCreateSchema = z.object({
  ...baseHistoryFields,
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください。"),
});

export const HistoryUpdateSchema = z.object({
  ...baseHistoryFields,
  validFlag: z.boolean({ required_error: "true か false を選択してください。" }),
  updatedAt: z.string().min(1, "更新日は必須です。"),
});

export type HistoryCreateInput = z.infer<typeof HistoryCreateSchema>;
export type HistoryUpdateInput = z.infer<typeof HistoryUpdateSchema>;

/**
 * サーバーサイド用
 */
export const HistoryServerCreateSchema = z.object({
  studentIds: z.array(z.string()).min(1, "学生を1人以上選択してください"),
  statusId: z.coerce
    .number()
    .int()
    .min(1, "正しいステータスを入力してください")
    .max(7, "正しいステータスを入力してください"),
  other: z.string().max(30, "備考は30文字以内で入力してください。").optional(),
  startTime: z.coerce.date({
    errorMap: () => ({ message: "正しい有効開始日を入力してください。" }),
  }),
  endTime: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.date().optional()
  ),
});

export const HistoryServerUpdateSchema = HistoryServerCreateSchema.omit({
  studentIds: true,
}).extend({
  validFlag: z.coerce.boolean({
    errorMap: () => ({ message: "true か false を選択してください。" }),
  }),
  updatedAt: z.coerce.date({
    errorMap: () => ({ message: "正しい更新日を入力してください。" }),
  }),
});

export type HistoryServerCreateInput = z.infer<typeof HistoryServerCreateSchema>;
export type HistoryServerUpdateInput = z.infer<typeof HistoryServerUpdateSchema>;
