import { describe, it, expect } from "vitest";
import { HistoryCreateSchema, HistoryUpdateSchema } from "./schemas";

describe("HistoryCreateSchema", () => {
  it("正常系: 必須項目がすべて揃っていれば通る", () => {
    // Arrange
    const input = {
      statusId: "1",
      studentIds: ["student-1", "student-2"],
      startTime: "10:00",
      endTime: "18:00",
      other: "備考",
    };

    // Act
    const result = HistoryCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(true);
  });

  it("異常系: studentIds が空配列の場合はエラー", () => {
    // Arrange
    const input = {
      statusId: "1",
      studentIds: [],
      startTime: "10:00",
    };

    // Act
    const result = HistoryCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path[0] === "studentIds" &&
            issue.message === "学生を1人以上選択してください。",
        ),
      ).toBe(true);
    }
  });

  it("異常系: studentIds に空文字が含まれる場合はエラー", () => {
    // Arrange
    const input = {
      statusId: "1",
      studentIds: [""],
      startTime: "10:00",
    };

    // Act
    const result = HistoryCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });

  it("異常系: statusId が空文字の場合はエラー", () => {
    // Arrange
    const input = {
      statusId: "",
      studentIds: ["student-1"],
      startTime: "10:00",
    };

    // Act
    const result = HistoryCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });

  it("異常系: startTime が未指定の場合はエラー", () => {
    // Arrange
    const input = {
      statusId: "1",
      studentIds: ["student-1"],
    };

    // Act
    const result = HistoryCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });
});

describe("HistoryUpdateSchema", () => {
  it("正常系: 更新用必須項目が揃っていれば通る", () => {
    // Arrange
    const input = {
      statusId: "1",
      startTime: "10:00",
      studentIds: ["student-1"],
      validFlag: true,
      updatedAt: "2024-01-01",
    };

    // Act
    const result = HistoryUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(true);
  });

  it("異常系: validFlag が未指定の場合はエラー", () => {
    // Arrange
    const input = {
      statusId: "1",
      startTime: "10:00",
      studentIds: ["student-1"],
      updatedAt: "2024-01-01",
    };

    // Act
    const result = HistoryUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });

  it("異常系: updatedAt が未指定の場合はエラー", () => {
    // Arrange
    const input = {
      statusId: "1",
      startTime: "10:00",
      studentIds: ["student-1"],
      validFlag: true,
    };

    // Act
    const result = HistoryUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });
});
