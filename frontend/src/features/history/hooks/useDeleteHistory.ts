import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { historyApi } from '@/features/history/api';
import { ROUTES } from '@/routes/routes';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { handleApiErrorWithUI } from '@/utils/handleApiError';

export function useDeleteHistory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (historyId: string) => historyApi.delete(historyId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['histories'] });
      toast.success(APIMESSAGE.DELETE_SUCCESS);
      navigate(ROUTES.HISTORY.INDEX);
    },

    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  return {
    deleteHistory: mutation.mutate,
    loading: mutation.isPending,
  };
}
