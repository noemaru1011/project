import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useCreate<I>(createFn: (data: I) => Promise<ApiResponse<void>>) {
  const { loading, start, end } = useLoadingCounter();

  const create = async (data: I) => {
    start();
    try {
      const res = await createFn(data);
      return res;
    } finally {
      end();
    }
  };
  return { create, loading };
}
