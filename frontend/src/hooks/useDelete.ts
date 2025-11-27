import { useCallback } from 'react';
import { toast } from 'react-toastify';
import type { ApiResponse } from '@/interface/apiResponse';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';

export function useDelete(deleteFn: (id: string) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const remove = useCallback(
    async (id: string) => {
      start();
      try {
        console.log(id);
        const res = await deleteFn(id);
        toast.success(res.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [deleteFn],
  );

  return { remove, loading };
}
