import { authApi } from '@/features/auth/api';
import type { LoginForm } from '@shared/schemas/login';
import { useLoadingCounter } from '@/hooks/useLoadingCounter';
import type { ApiResponse } from '@/interface/apiResponse';
import type { LoginResponse } from '@/features/auth/types';
import { useLoginContext } from '@/hooks/passwordUpdateContext';

export function useLogin() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();

  const login = async (data: LoginForm): Promise<ApiResponse<LoginResponse>> => {
    start();
    try {
      const res = await authApi.login(data);
      setPasswordUpdateRequired(res.data?.passwordUpdateRequired ?? false);
      return res;
    } finally {
      end();
    }
  };
  return { login, loading };
}
