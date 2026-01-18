import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import { useCallback } from 'react';

export function useView<T>(viewFn: (id: string) => Promise<ApiResponse<T>>) {
  const { loading, start, end } = useLoadingCounter();

  const view = useCallback(
    async (id: string): Promise<ApiResponse<T>> => {
      start();
      try {
        return await viewFn(id);
      } finally {
        end();
      }
    },
    [viewFn, start, end],
  );

  return { view, loading };
}
