import { Role } from './role';

export type JwtPayload = {
  id: string;
  role: Role;
};
