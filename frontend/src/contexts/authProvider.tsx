import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { Role } from '@shared/models/common';
import { AuthContext } from '@/contexts/auchContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<Role | null>(null);

  // Cookie → Context 復元（初回のみ）
  useEffect(() => {
    const stored = Cookies.get('role') as Role | undefined;
    if (stored) {
      setRoleState(stored);
    }
  }, []);

  const setRole = (newRole: Role | null) => {
    if (newRole) {
      Cookies.set('role', newRole);
    } else {
      Cookies.remove('role');
    }
    setRoleState(newRole);
  };

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};
