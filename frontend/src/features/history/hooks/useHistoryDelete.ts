import { useNavigate } from 'react-router-dom';
import { historyApi } from '@/features/history';
import { handleApiError } from '@/utils';
import { useDelete } from '@/hooks/useDelete';

export const useHistoryDelete = () => {
  const navigate = useNavigate();
  const { remove, loading } = useDelete(historyApi.delete);

  const deleteHistory = async (historyId: string) => {
    try {
      return await remove(historyId);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { deleteHistory, loading };
};
