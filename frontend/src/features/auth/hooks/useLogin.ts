import { authApi } from '@/features/auth/api';
import type { LoginForm } from '@shared/schemas/login';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import type { ApiResponse } from '@/api/types';
import type { LoginResponse } from '@shared/loginResponse';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/atchContext';

export function useLogin() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const { setRole } = useAuth();

  const login = async (data: LoginForm): Promise<ApiResponse<LoginResponse>> => {
    start();
    try {
      const res = await authApi.login(data);
      const required = res.data?.passwordUpdateRequired ?? false;
      setPasswordUpdateRequired(required);
      setRole(res.data?.role ?? null);
      return res;
    } finally {
      end();
    }
  };
  return { login, loading };
}
