import { useCreate } from '@/hooks/api/useCreate';
import { historyApi } from '@/features/history';
import type { HistoryCreateInput } from '@shared/models/history';

export const useHistoryCreate = () => {
  const { create, loading } = useCreate<HistoryCreateInput>(historyApi.create);

  const createHistory = async (data: HistoryCreateInput) => create(data);

  return { createHistory, loading };
};
