import { describe, it, expect } from "vitest";
import { LoginSchema, PasswordUpdateSchema } from "./schemas";

describe("LoginSchema", () => {
  describe("email validation", () => {
    it("正しいメールアドレス形式なら通る", () => {
      // Arrange
      const input = {
        email: "test@example.com",
        password: "123456",
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);
    });

    it("メールアドレス形式が不正な場合はエラーになる", () => {
      // Arrange
      const input = {
        email: "invalid-email",
        password: "123456",
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["email"]);
      }
    });

    it("メールアドレスが255文字以内なら通る", () => {
      // Arrange
      const email = "a".repeat(243) + "@example.com"; // 255文字以内
      const input = {
        email,
        password: "123456",
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);
    });

    it("メールアドレスが256文字以上の場合はエラーになる", () => {
      // Arrange
      const email = "a".repeat(244) + "@example.com"; // 256文字超
      const input = {
        email,
        password: "123456",
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["email"]);
      }
    });
  });

  describe("password validation", () => {
    it("6文字以上100文字以内なら通る", () => {
      // Arrange
      const input = {
        email: "test@example.com",
        password: "123456",
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);
    });

    it("5文字以下の場合はエラーになる", () => {
      // Arrange
      const input = {
        email: "test@example.com",
        password: "12345",
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["password"]);
      }
    });

    it("101文字以上の場合はエラーになる", () => {
      // Arrange
      const input = {
        email: "test@example.com",
        password: "a".repeat(101),
      };

      // Act
      const result = LoginSchema.safeParse(input);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["password"]);
      }
    });
  });
});

describe("PasswordUpdateSchema", () => {
  it("新しいパスワードと確認用パスワードが一致しない場合はエラーになる", () => {
    // Arrange
    const input = {
      oldPassword: "123456",
      newPassword: "abcdef",
      checkNewPassword: "xxxxxx",
    };

    // Act
    const result = PasswordUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["checkNewPassword"]);
    }
  });

  it("新しいパスワードが一致していれば通る", () => {
    // Arrange
    const input = {
      oldPassword: "123456",
      newPassword: "abcdef",
      checkNewPassword: "abcdef",
    };

    // Act
    const result = PasswordUpdateSchema.safeParse(input);

    // Assert
    expect(result.success).toBe(true);
  });
});
