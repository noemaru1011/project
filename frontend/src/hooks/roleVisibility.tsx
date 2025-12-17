import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import type { Role } from '@shared/role';

interface Props {
  children: ReactNode;
  allowedRoles: Role[];
}

export const RoleVisibility = ({ children, allowedRoles }: Props) => {
  const role = Cookies.get('role') as Role | undefined;

  if (!role) return null;
  if (!allowedRoles.includes(role)) return null;

  return <>{children}</>;
};
