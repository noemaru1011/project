import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useFetchAll<T>(indexFn: () => Promise<ApiResponse<T[]>>) {
  const { loading, start, end } = useLoadingCounter();

  const fetchAll = async (): Promise<ApiResponse<T[]>> => {
    start();
    try {
      return await indexFn();
    } finally {
      end();
    }
  };

  return { fetchAll, loading };
}
