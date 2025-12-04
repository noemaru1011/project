import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';

export function useCreate<I>(createFn: (data: I) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();

  const create = async (data: I) => {
    start();
    try {
      console.log(data);
      const res = await createFn(data);
      return res;
    } finally {
      end();
    }
  };
  return { create, loading };
}
