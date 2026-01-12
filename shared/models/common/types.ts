import type { ApiMessageCode, ApiMessage } from "../../constants/apiMessage";

/**
 * 共通APIボディ (バックエンドで使用)
 */
export interface ApiBody<T> {
  code: ApiMessageCode;
  data: T | null;
  message: ApiMessage;
}

/**
 * APIレスポンス (フロントエンドで使用)
 */
export interface ApiResponse<T> extends ApiBody<T> {
  status: number;
}

/**
 * APIエラーレスポンス
 */
export interface ApiErrorResponse extends ApiResponse<null> {
  redirectTo?: string;
}

/**
 * 権限ロール定義
 */
export const ROLE = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
