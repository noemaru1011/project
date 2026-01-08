import { historySearchApi } from '@/features/search/history/api';
import { useSearch } from '@/hooks/api/useSearch';

export const useHistorySearchByTime = () => {
  const { data, search, loading } = useSearch<any, any>((query: string) =>
    historySearchApi.searchByTime(query),
  );

  const searchHistoriesByTime = (query: string) => search(query);

  return { data, searchHistoriesByTime, loading };
};
