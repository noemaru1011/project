import { useMutation } from '@tanstack/react-query';
import { historyApi } from '@/features/history/api';
import type { HistoryUpdateInput } from '@shared/models/history';

export function useUpdateHistory() {
  const mutation = useMutation({
    mutationFn: ({ historyId, data }: { historyId: string; data: HistoryUpdateInput }) =>
      historyApi.update(historyId, data),
  });

  return {
    updateHistory: mutation.mutate,
    updating: mutation.isPending,
  };
}
