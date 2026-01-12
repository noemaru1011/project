import { useUpdate } from '@/hooks/api/useUpdate';
import { historyApi } from '@/features/history';
import type { HistoryUpdateInput } from '@shared/models/history';

export const useHistoryUpdate = () => {
  const { update, loading } = useUpdate<HistoryUpdateInput>(historyApi.update);

  const updateHistory = async (historyId: string, data: HistoryUpdateInput) =>
    update(historyId, data);

  return { updateHistory, loading };
};
