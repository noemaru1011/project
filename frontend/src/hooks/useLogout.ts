import { LogoutApi } from '@/api/logoutApi';
import { useLoadingCounter } from './useLoading';

//pageがないためuseCrudではなくuseLogoutを作成
export function useLogout() {
  const { loading, start, end } = useLoadingCounter();

  const logout = async () => {
    start();
    try {
      const res = await LogoutApi.logout();
      return res;
    } finally {
      end();
    }
  };

  return { logout, loading };
}
