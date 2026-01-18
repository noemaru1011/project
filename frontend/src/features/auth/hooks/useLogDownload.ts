import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';

export function useLogDownload() {
  const mutation = useMutation({
    // mutationFn は Blob を返す想定
    mutationFn: () => authApi.logDownload(),
  });

  return {
    logDownload: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}
