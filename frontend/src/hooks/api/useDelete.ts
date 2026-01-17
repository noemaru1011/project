import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useDelete(deleteFn: (id: string) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();

  const remove = async (id: string) => {
    start();
    try {
      return await deleteFn(id);
    } finally {
      end();
    }
  };

  return { remove, loading };
}
