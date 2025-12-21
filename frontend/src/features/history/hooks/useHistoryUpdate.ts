import { useNavigate } from 'react-router-dom';
import { useUpdate } from '@/hooks/useUpdate';
import { handleApiError } from '@/utils';
import { historyApi } from '@/features/history';
import type { HistoryUpdateForm } from '@shared/schemas/history';

export const useHistoryUpdate = () => {
  const navigate = useNavigate();
  const { update, loading } = useUpdate<HistoryUpdateForm>(historyApi.update);

  const updateHistory = async (historyId: string, data: HistoryUpdateForm) => {
    try {
      return await update(historyId, data);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { updateHistory, loading };
};
