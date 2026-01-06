import { authApi } from '@/features/auth/api';
import { useLoadingCounter } from '@/hooks/ui/useLoadingCounter';

export function useLogDownload() {
  const { loading, start, end } = useLoadingCounter();
  //いったんany
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
