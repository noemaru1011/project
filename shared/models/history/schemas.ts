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
  studentIds: z.array(z.string(), {
    error: (issue) =>
      issue.message === "too_small"
        ? "学生を1人以上選択してください。"
        : "学生の形式が正しくありません。",
  }),
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
  studentIds: z.array(
    z.string().nonempty({ error: "学生を1人以上選択してください。" })
  ),
  statusId: z.coerce
    .number({
      error: (issue) => {
        if (issue.code === "invalid_type" || issue.code === "invalid_number") {
          return "ステータスは必須です。";
        }
        return "ステータスは数値を入力してください。";
      },
    })
    .int({
      error: "ステータスは整数を入力してください。",
    }),
  other: z
    .string()
    .max(30, { error: "備考は30文字以内で入力してください。" })
    .optional(),
  startTime: z.coerce.date({
    error: (issue) => {
      if (issue.code === "invalid_type" || issue.code === "invalid_date") {
        return "有効開始時間は必須です。";
      }
      return "正しい有効開始時間を入力してください。";
    },
  }),
  endTime: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.date({ error: "正しい有効終了日を入力してください。" }).optional()
  ),
});

export const HistoryServerUpdateSchema = HistoryServerCreateSchema.omit({
  studentIds: true,
}).extend({
  validFlag: z.boolean({ error: "trueかfalseを選択してください。" }),
  updatedAt: z.coerce.date({
    error: (issue) => {
      if (issue.code === "invalid_type" || issue.code === "invalid_date") {
        return "更新日は必須です。";
      }
      return "正しい更新日を入力してください。";
    },
  }),
});

export type HistoryServerCreateInput = z.infer<
  typeof HistoryServerCreateSchema
>;
export type HistoryServerUpdateInput = z.infer<
  typeof HistoryServerUpdateSchema
>;
