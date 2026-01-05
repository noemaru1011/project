import { useCreate } from '@/hooks/api/useCreate';
import { historyApi } from '@/features/history';
import type { HistoryForm } from '@shared/schemas/history';

export const useHistoryCreate = () => {
  const { create, loading } = useCreate<HistoryForm>(historyApi.create);

  const createHistory = async (data: HistoryForm) => create(data);

  return { createHistory, loading };
};
