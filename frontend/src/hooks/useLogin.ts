import { LoginApi } from '@/api/loginApi';
import type { LoginForm } from '@shared/schemas/login';
import { useLoadingCounter } from './useLoading';
import { useNavigate } from 'react-router-dom';
import type { ApiResponse } from '@/interface/apiResponse';
import { ROUTES } from '@/constants/routes';
import type { LoginResponse } from '@/interface/loginResponse';
import { useLoginContext } from '@/hooks/LoginContext';

export function useLogin() {
  const navigate = useNavigate();
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();

  const login = async (data: LoginForm): Promise<ApiResponse<LoginResponse>> => {
    start();
    try {
      const res = await LoginApi.login(data);
      setPasswordUpdateRequired(res.data?.passwordUpdateRequired ?? false);
      navigate(ROUTES.HOME);
      return res;
    } finally {
      end();
    }
  };
  return { login, loading };
}
