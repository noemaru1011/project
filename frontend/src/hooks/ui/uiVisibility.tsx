import type { ReactNode } from 'react';
import type { Role } from '@shared/role';
import { useAuth } from '@/contexts/atchContext';

interface Props {
  children: ReactNode;
  allowedRoles: Role[];
}

export const UiVisibility = ({ children, allowedRoles }: Props) => {
  const { role } = useAuth();

  if (!role) return null;
  if (!allowedRoles.includes(role)) return null;

  return <>{children}</>;
};
