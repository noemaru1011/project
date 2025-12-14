import type { Role } from '@/types/role';

//拡張可能

export interface LoginResponse {
  token: string;
  role: Role;
  passwordUpdateRequired?: boolean;
}
