import { z } from "zod";

/**
 * 履歴共通フィールド
 */
const baseHistoryFields = {
  statusId: z.string().min(1, { error: "ステータスは必須です。" }),
  other: z
    .string()
    .max(30, { error: "備考は30文字以内で入力してください。" })
    .optional(),
  startTime: z.string().min(1, { error: "有効開始時間は必須です。" }),
  endTime: z.string().optional(),
};

/**
 * フロントエンド用: 新規作成・編集
 */
export const HistoryCreateSchema = z.object({
  ...baseHistoryFields,
  studentIds: z
    .array(z.string().min(1), {
      error: "学生を1人以上選択してください。",
    })
    .min(1, { error: "学生を1人以上選択してください。" }),
});

export const HistoryUpdateSchema = z.object({
  ...baseHistoryFields,
  validFlag: z.boolean({ error: "trueかfalse を入力してください。" }),
  updatedAt: z.string().min(1, { error: "更新日は必須です。" }),
});

export type HistoryCreateInput = z.infer<typeof HistoryCreateSchema>;
export type HistoryUpdateInput = z.infer<typeof HistoryUpdateSchema>;

/**
 * サーバーサイド用
 */
export const HistoryServerCreateSchema = z.object({
  studentIds: z.array(z.string().nonempty()),
  statusId: z.coerce.number().int(),
  other: z.string().max(30).optional(),
  startTime: z.coerce.date(),
  endTime: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.date().optional(),
  ),
});

export const HistoryServerUpdateSchema = HistoryServerCreateSchema.omit({
  studentIds: true,
}).extend({
  validFlag: z.boolean(),
  updatedAt: z.coerce.date(),
});

export type HistoryServerCreateInput = z.infer<
  typeof HistoryServerCreateSchema
>;
export type HistoryServerUpdateInput = z.infer<
  typeof HistoryServerUpdateSchema
>;

export const HistorySearchSchema = z.object({
  query: z.string(),
});

export type HistorySearchInput = z.infer<typeof HistorySearchSchema>;

export const HistoryServerSearchSchema = z.object({
  query: z.coerce.date(),
});

export type HistoryServerSearchInput = z.infer<
  typeof HistoryServerSearchSchema
>;
