import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';

export function useDelete(deleteFn: (id: string) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();

  const remove = async (id: string) => {
    start();
    try {
      const res = await deleteFn(id);
      return res;
    } finally {
      end();
    }
  };

  return { remove, loading };
}
