import { useCallback } from 'react';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';

export function useView<T>(viewFn: (id: string) => Promise<ApiResponse<T>>) {
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const view = useCallback(
    async (id: string): Promise<T> => {
      start();
      try {
        const res = await viewFn(id);
        return res.data as T;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [viewFn],
  );

  return { view, loading };
}
