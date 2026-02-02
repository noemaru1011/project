import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';
import type { PasswordUpdateInput } from '@shared/models/auth';

export function useUpdatePassword() {
  const mutation = useMutation({
    mutationFn: (data: PasswordUpdateInput) => authApi.updatePassword(data),
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
  };
}
