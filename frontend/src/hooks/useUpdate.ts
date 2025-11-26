import { useCallback } from 'react';
import { toast } from 'react-toastify';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';

export function useUpdate<I>(updateFn: (id: string, data: I) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const update = useCallback(
    async (id: string, data: I) => {
      start();
      try {
        const res = await updateFn(id, data);
        toast.success(res.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [updateFn],
  );

  return { update, loading };
}
