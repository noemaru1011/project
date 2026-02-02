import { useMutation } from '@tanstack/react-query';
import { historyApi } from '@/features/history/api';

export function useDeleteHistory() {
  const mutation = useMutation({
    mutationFn: (historyId: string) => historyApi.delete(historyId),
  });

  return {
    deleteHistory: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
