import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useSearch<T, Query = void>(searchFn: (query: Query) => Promise<ApiResponse<T[]>>) {
  const { loading, start, end } = useLoadingCounter();

  const search = async (query: Query) => {
    start();
    try {
      return await searchFn(query);
    } finally {
      end();
    }
  };
  return { search, loading };
}
