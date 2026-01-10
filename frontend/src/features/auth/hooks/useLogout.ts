import { authApi } from '@/features/auth/api';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import { useAuth } from '@/contexts/atchContext';

export function useLogout() {
  const { loading, start, end } = useLoadingCounter();
  const { setRole } = useAuth();

  const logout = async () => {
    start();
    try {
      const res = await authApi.logout();
      setRole(null);
      return res;
    } finally {
      end();
    }
  };

  return { logout, loading };
}
