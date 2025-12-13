import type { ReactNode } from 'react';
import Cookies from 'js-cookie';

export const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: ('ADMIN' | 'STUDENT')[];
}) => {
  const role = Cookies.get('role') as 'ADMIN' | 'STUDENT' | undefined;

  if (!role) return null;
  if (!allowedRoles.includes(role)) return null;

  return <>{children}</>;
};
