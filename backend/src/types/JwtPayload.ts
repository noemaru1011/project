import { Role } from '@shared/models/common';

export type JwtPayload = {
  id: string;
  role: Role;
};
