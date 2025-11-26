import { useState, useCallback } from 'react';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';

export function useFetchAll<T>(indexFn: () => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const fetchAll = useCallback(async (): Promise<void> => {
    start();
    try {
      const res = await indexFn();
      if (res.data) setData(res.data);
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      end();
    }
  }, [indexFn]);

  return { data, fetchAll, loading };
}
