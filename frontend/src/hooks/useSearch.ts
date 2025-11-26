import { useState, useCallback } from 'react';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';

export function useSearch<T, Query = void>(searchFn: (query: Query) => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const search = useCallback(
    async (query: Query): Promise<void> => {
      start();
      try {
        const res = await searchFn(query);
        if (res.data) setData(res.data);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [searchFn],
  );

  return { data, search, loading };
}
