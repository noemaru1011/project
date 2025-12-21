import type { ApiResponse } from '@/api/types';
import { useLoadingCounter } from './useLoadingCounter';

export function useView<T>(viewFn: (id: string) => Promise<ApiResponse<T>>) {
  const { loading, start, end } = useLoadingCounter();

  const view = async (id: string): Promise<T> => {
    start();
    try {
      const res = await viewFn(id);
      return res.data as T;
    } finally {
      end();
    }
  };

  return { view, loading };
}
