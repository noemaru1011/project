import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';
import type { LoginInput } from '@shared/models/auth';

export function useLogin() {
  const mutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
  };
}
