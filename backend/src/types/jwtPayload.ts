import { Role } from '@shared/role';

export type JwtPayload = {
  id: string;
  role: Role;
};
