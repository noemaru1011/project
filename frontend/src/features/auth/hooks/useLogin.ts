import { authApi } from '@/features/auth/api';
import type { LoginForm } from '@shared/schemas/login';
import { useLoadingCounter } from '@/hooks/ui/useLoadingCounter';
import type { ApiResponse } from '@/api/types';
import type { LoginResponse } from '@/features/auth/types';
import { useLoginContext } from '@/contexts/passwordUpdateContext';

export function useLogin() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();

  const login = async (data: LoginForm): Promise<ApiResponse<LoginResponse>> => {
    start();
    try {
      const res = await authApi.login(data);
      const required = res.data?.passwordUpdateRequired ?? false;

      setPasswordUpdateRequired(required);
      return res;
    } finally {
      end();
    }
  };
  return { login, loading };
}
