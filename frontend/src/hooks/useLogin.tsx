import { LoginApi } from '@/api/loginApi';
import type { Login } from '@shared/schemas/login';
import { toast } from 'react-toastify';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useLoginContext } from '@/hooks/useLoginContext';

export function useLogin() {
  const navigate = useNavigate();
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();
  const handleError = useErrorHandler();

  const login = async (data: Login) => {
    try {
      start();
      const response = await LoginApi.login(data);
      setPasswordUpdateRequired(response.data?.passwordUpdateRequired ?? false);
      toast.success(response.message);
      navigate(ROUTES.HOME);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      end();
    }
  };
  return { login, loading, setPasswordUpdateRequired };
}
