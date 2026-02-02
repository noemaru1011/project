import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';

export function useLogout() {
  const mutation = useMutation({
    mutationFn: () => authApi.logout(),
  });

  return {
    logout: mutation.mutate,
    loading: mutation.isPending,
  };
}
