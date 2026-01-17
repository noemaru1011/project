import type { ApiResponse } from '@shared/models/common';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';

export function useCreate<I, O>(createFn: (data: I) => Promise<ApiResponse<O>>) {
  const { loading, start, end } = useLoadingCounter();

  const create = async (data: I): Promise<ApiResponse<O>> => {
    start();
    try {
      return await createFn(data);
    } finally {
      end();
    }
  };

  return { create, loading };
}
