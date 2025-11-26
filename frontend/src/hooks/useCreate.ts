import { useCallback } from 'react';
import { toast } from 'react-toastify';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';

export function useCreate<I>(createFn: (data: I) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const create = useCallback(
    async (data: I) => {
      start();
      try {
        const res = await createFn(data);
        toast.success(res.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [createFn],
  );

  return { create, loading };
}
