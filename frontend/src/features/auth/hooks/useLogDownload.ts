import { authApi } from '@/features/auth/api';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useLogDownload() {
  const { loading, start, end } = useLoadingCounter();
  const logDownload = async (): Promise<Blob> => {
    start();
    try {
      const res = await authApi.logDownload();
      return res;
    } finally {
      end();
    }
  };
  return { logDownload, loading };
}
