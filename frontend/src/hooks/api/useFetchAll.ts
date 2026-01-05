import { useState } from 'react';
import type { ApiResponse } from '@/api/types';
import { useLoadingCounter } from './useLoadingCounter';

export function useFetchAll<T>(indexFn: () => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();

  const fetchAll = async (): Promise<void> => {
    start();
    try {
      const res = await indexFn();
      setData(res.data ?? []);
    } finally {
      end();
    }
  };

  return { data, fetchAll, loading };
}
