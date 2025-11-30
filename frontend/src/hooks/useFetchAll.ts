import { useState } from 'react';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';

export function useFetchAll<T>(indexFn: () => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();

  const fetchAll = async (): Promise<void> => {
    start();
    try {
      const res = await indexFn();
      if (res.data) setData(res.data);
    } finally {
      end();
    }
  };

  return { data, fetchAll, loading };
}
