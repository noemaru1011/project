import { useNavigate } from 'react-router-dom';
import { useCreate } from '@/hooks/useCreate';
import { historyApi } from '@/features/history';
import { handleApiError } from '@/utils';
import type { HistoryForm } from '@shared/schemas/history';

export const useHistoryCreate = () => {
  const navigate = useNavigate();
  const { create, loading } = useCreate<HistoryForm>(historyApi.create);

  const createHistory = async (data: HistoryForm) => {
    try {
      return await create(data);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { createHistory, loading };
};
