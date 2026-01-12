import type { Role } from "../common/types";

/**
 * ログインレスポンス
 */
export interface LoginResponse {
  token: string;
  role: Role;
  passwordUpdateRequired?: boolean;
}
