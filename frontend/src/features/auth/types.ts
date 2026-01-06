import type { Role } from '@shared/role';

export interface LoginResponse {
  token: string;
  role: Role;
  passwordUpdateRequired: boolean;
}
