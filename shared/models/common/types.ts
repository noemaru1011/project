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
 * APIレスポンス (フロントエンドで使用、Bodyにはステータスコードを含まないため)
 */
export interface ApiResponse<T> extends ApiBody<T> {
  status: number;
}

/**
 * APIエラーレスポンス (フロントエンドで使用)
 */
export interface ApiErrorResponse extends ApiResponse<null> {
  redirectTo?: string;
}

/**
 * ページング情報
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * ページング付きレスポンス
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

/**
 * 権限ロール定義
 */
export const ROLE = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
