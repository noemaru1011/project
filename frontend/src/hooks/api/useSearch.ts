import { useState } from 'react';
import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useSearch<T, Query = void>(searchFn: (query: Query) => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();

  const search = async (query: Query) => {
    start();
    try {
      const res = await searchFn(query);
      setData(res.data ?? []);
      return res;
    } finally {
      end();
    }
  };

  return { data, search, loading };
}
