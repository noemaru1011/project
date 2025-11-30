import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';

export function useUpdate<I>(updateFn: (id: string, data: I) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();

  const update = async (id: string, data: I) => {
    start();
    try {
      const res = await updateFn(id, data);
      return res;
    } finally {
      end();
    }
  };

  return { update, loading };
}
