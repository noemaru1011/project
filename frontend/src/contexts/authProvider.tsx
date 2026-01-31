import { useState } from 'react';
import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import type { Role } from '@shared/models/common';
import { AuthContext } from '@/contexts/authContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role | null>(() => {
    const stored = Cookies.get('role') as Role | undefined;
    return stored || null;
  });

  const setRole = (newRole: Role | null) => {
    if (newRole) {
      Cookies.set('role', newRole, { secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove('role');
    }
    setRoleState(newRole);
  };

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};
