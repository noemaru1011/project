import { authApi } from '@/features/auth/api';
import { useLoadingCounter } from '@/hooks/ui/useLoadingCounter';

export function useLogout() {
  const { loading, start, end } = useLoadingCounter();

  const logout = async () => {
    start();
    try {
      const res = await authApi.logout();
      return res;
    } finally {
      end();
    }
  };

  return { logout, loading };
}
