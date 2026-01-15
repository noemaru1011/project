import { describe, it, expect } from "vitest";
import {
  HistoryServerCreateSchema,
  HistoryServerUpdateSchema,
} from "./schemas";

describe("StudentServerSchema", () => {
  it("新規作成時必須チェック", () => {
    const r = HistoryServerCreateSchema.safeParse({});

    expect(r.success).toBe(false);

    if (!r.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of r.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = [];
        }
        fieldErrors[fieldName].push(issue.message);
      }

      expect(fieldErrors).toEqual({
        statusId: ["ステータスは必須です。"],
        studentIds: ["学生を1人以上選択してください。"],
        startTime: ["有効開始時間は必須です。"],
      });
    }
  });

  it("備考が文字数超過", () => {
    const r = HistoryServerCreateSchema.safeParse({
      statusId: "1",
      other: "a".repeat(31),
      studentIds: ["1"],
      startTime: "2026-01-15T10:30",
    });

    expect(r.success).toBe(false);

    if (!r.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of r.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = [];
        }
        fieldErrors[fieldName].push(issue.message);
      }

      expect(fieldErrors).toEqual({
        other: ["備考は30文字以内で入力してください。"],
      });
    }
  });

  it("更新時必須チェック", () => {
    const r = HistoryServerUpdateSchema.safeParse({});

    expect(r.success).toBe(false);
    if (!r.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of r.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = [];
        }
        fieldErrors[fieldName].push(issue.message);
      }

      expect(fieldErrors).toEqual({
        statusId: ["ステータスは必須です。"],
        startTime: ["有効開始時間は必須です。"],
        validFlag: ["trueかfalseを選択してください。"],
        updatedAt: ["更新日は必須です。"],
      });
    }
  });

  it("日付チェック", () => {
    const r = HistoryServerUpdateSchema.safeParse({
      statusId: "1",
      other: "a",
      studentIds: ["1"],
      startTime: "2026-01-15T10:30",
      validFlag: true,
      updatedAt: "2026-01-15T10:30",
    });
    expect(r.success).toBe(true);
  });
});
