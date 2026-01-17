import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useUpdate<I, O>(updateFn: (id: string, data: I) => Promise<ApiResponse<O>>) {
  const { loading, start, end } = useLoadingCounter();

  const update = async (id: string, data: I) => {
    start();
    try {
      return await updateFn(id, data);
    } finally {
      end();
    }
  };

  return { update, loading };
}
