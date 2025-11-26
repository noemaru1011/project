import { LogoutApi } from '@/api/logoutApi';
import { toast } from 'react-toastify';
import { useLoadingCounter } from './useLoading';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from './useErrorHandler';

//pageがないためuseCrudではなくuseLogoutを作成
export function useLogout() {
  const navigate = useNavigate();
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const logout = async () => {
    try {
      start();
      const res = await LogoutApi.logout();
      navigate(ROUTES.AUTH.LOGIN);
      toast.success(res.message);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      end();
    }
  };

  return { logout, loading };
}
