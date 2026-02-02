import { useMutation } from '@tanstack/react-query';
import { historyApi } from '@/features/history';
import type { HistoryCreateInput } from '@shared/models/history';

export function useCreateHistory() {
  const mutation = useMutation({
    mutationFn: (data: HistoryCreateInput) => historyApi.create(data),
  });

  return {
    createHistory: mutation.mutate,
    isPending: mutation.isPending,
  };
}
