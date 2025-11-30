import { useState } from 'react';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';

export function useSearch<T, Query = void>(searchFn: (query: Query) => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();

  const search = async (query: Query) => {
    start();
    try {
      const res = await searchFn(query);
      if (res.data) setData(res.data);
    } finally {
      end();
    }
  };

  return { data, search, loading };
}
