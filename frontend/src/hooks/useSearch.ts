import { useState } from 'react';
import type { ApiResponse } from '@/api/types';
import { useLoadingCounter } from './useLoadingCounter';

export function useSearch<T, Query = void>(searchFn: (query: Query) => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();

  const search = async (query: Query) => {
    start();
    try {
      const res = await searchFn(query);
      setData(res.data ?? []);
    } finally {
      end();
    }
  };

  return { data, search, loading };
}
