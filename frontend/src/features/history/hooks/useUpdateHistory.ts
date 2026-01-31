import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { historyApi } from '@/features/history/api';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { HistoryUpdateInput } from '@shared/models/history';

export function useUpdateHistory(historyId: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: HistoryUpdateInput) => historyApi.update(historyId, data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['histories'] });
      queryClient.invalidateQueries({ queryKey: ['history', historyId] });

      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    },

    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    updateHistory: mutation.mutate,
    updating: mutation.isPending,
  };
}
