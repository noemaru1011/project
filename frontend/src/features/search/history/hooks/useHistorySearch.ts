import { historySearchApi } from '@/features/search/history/api';
import type { HistoryResult } from '@/features/history/types';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { useSearch } from '@/hooks/api/useSearch';

export const useHistorySearch = () => {
  const { data, search, loading } = useSearch<HistoryResult, StudentQueryForm>(
    historySearchApi.search,
  );

  return { data, search, loading };
};
