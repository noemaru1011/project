import type { Role } from "./role";

//拡張可能
export interface Login {
  token: string;
  role: Role;
  passwordUpdateRequired?: boolean;
}
