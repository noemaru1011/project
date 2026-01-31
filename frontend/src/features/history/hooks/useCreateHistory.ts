import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { historyApi } from '@/features/history';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { HistoryCreateInput } from '@shared/models/history';

export function useCreateHistory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: HistoryCreateInput) => historyApi.create(data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['histories'] });
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    },

    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    createHistory: mutation.mutate,
    creating: mutation.isPending,
  };
}
