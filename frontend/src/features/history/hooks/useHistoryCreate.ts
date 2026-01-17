import { useCreate } from '@/hooks/api/useCreate';
import { historyApi } from '@/features/history';
import type { HistoryCreateInput, HistoryResponse } from '@shared/models/history';

export const useHistoryCreate = () => {
  const { create, loading } = useCreate<HistoryCreateInput, HistoryResponse>(historyApi.create);

  const createHistory = async (data: HistoryCreateInput) => create(data);

  return { createHistory, loading };
};
