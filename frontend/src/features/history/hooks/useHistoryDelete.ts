import { historyApi } from '@/features/history';
import { useDelete } from '@/hooks/api/useDelete';

export const useHistoryDelete = () => {
  const { remove, loading } = useDelete(historyApi.delete);

  const deleteHistory = async (historyId: string) => remove(historyId);

  return { deleteHistory, loading };
};
