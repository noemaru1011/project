import { useUpdate } from '@/hooks/useUpdate';
import { historyApi } from '@/features/history';
import type { HistoryUpdateForm } from '@shared/schemas/history';

export const useHistoryUpdate = () => {
  const { update, loading } = useUpdate<HistoryUpdateForm>(historyApi.update);

  const updateHistory = async (historyId: string, data: HistoryUpdateForm) =>
    update(historyId, data);

  return { updateHistory, loading };
};
