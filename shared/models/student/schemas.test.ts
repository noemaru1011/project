import { describe, it, expect } from "vitest";
import { StudentCreateSchema, StudentUpdateSchema } from "./schemas";

const validCreateInput = {
  studentName: "山田太郎",
  email: "test@example.com",
  grade: "1",
  minorCategoryId: "10",
  departmentId: "5",
};

describe("StudentCreateSchema studentName", () => {
  it("1文字以上20文字以内なら通る", () => {
    // Arrange
    const input = { ...validCreateInput, studentName: "太郎" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(true);
  });

  it("空文字はエラー", () => {
    // Arrange
    const input = { ...validCreateInput, studentName: "" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["studentName"]);
    }
  });

  it("21文字以上はエラー", () => {
    // Arrange
    const input = {
      ...validCreateInput,
      studentName: "あ".repeat(21),
    };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });
});

describe("StudentCreateSchema email", () => {
  it("正しいメールアドレス形式は通る", () => {
    // Arrange
    const input = { ...validCreateInput, email: "user@test.co.jp" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(true);
  });

  it("不正なメール形式はエラー", () => {
    // Arrange
    const input = { ...validCreateInput, email: "invalid-email" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["email"]);
    }
  });

  it("256文字以上はエラー", () => {
    // Arrange
    const email = "a".repeat(244) + "@example.com";
    const input = { ...validCreateInput, email };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });
});

describe("StudentCreateSchema id fields", () => {
  it("grade が空文字の場合はエラー", () => {
    // Arrange
    const input = { ...validCreateInput, grade: "" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });

  it("minorCategoryId が空文字の場合はエラー", () => {
    // Arrange
    const input = { ...validCreateInput, minorCategoryId: "" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });

  it("departmentId が空文字の場合はエラー", () => {
    // Arrange
    const input = { ...validCreateInput, departmentId: "" };

    // Act
    const result = StudentCreateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
  });
});

describe("StudentUpdateSchema", () => {
  it("updatedAt があれば通る", () => {
    // Arrange
    const input = {
      ...validCreateInput,
      updatedAt: "2024-01-01",
    };

    // Act
    const result = StudentUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(true);
  });

  it("updatedAt が空文字の場合はエラー", () => {
    // Arrange
    const input = {
      ...validCreateInput,
      updatedAt: "",
    };

    // Act
    const result = StudentUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["updatedAt"]);
    }
  });
});
