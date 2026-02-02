import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';

export function useLogDownload() {
  const mutation = useMutation({
    mutationFn: () => authApi.logDownload(),
  });

  return {
    logDownload: mutation.mutate,
    loading: mutation.isPending,
  };
}
