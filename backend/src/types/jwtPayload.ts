import { Role } from '@shared/types/role';

export type JwtPayload = {
  id: string;
  role: Role;
};
