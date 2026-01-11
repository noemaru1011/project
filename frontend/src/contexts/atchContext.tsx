import { createContext, useContext } from 'react';
import type { Role } from '@shared/types/role';

type AuthContextType = {
  role: Role | null;
  setRole: (role: Role | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
