import { LoginApi } from '@/api/loginApi';
import type { LoginForm } from '@shared/schemas/login';
import { useLoadingCounter } from './useLoading';
import type { ApiResponse } from '@/interface/apiResponse';
import type { LoginResponse } from '@/interface/loginResponse';
import { useLoginContext } from '@/hooks/LoginContext';

export function useLogin() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();

  const login = async (data: LoginForm): Promise<ApiResponse<LoginResponse>> => {
    start();
    try {
      const res = await LoginApi.login(data);
      setPasswordUpdateRequired(res.data?.passwordUpdateRequired ?? false);
      return res;
    } finally {
      end();
    }
  };
  return { login, loading };
}
