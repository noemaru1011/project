import { useQuery } from '@tanstack/react-query';
import { historyApi } from '@/features/history/api';

export function useAggregateHistories(timeParam: string | null) {
  const query = useQuery({
    queryKey: ['histories', 'aggregate', timeParam],
    queryFn: () => historyApi.searchByTime(timeParam!),
    // timeParam がある時だけ実行
    enabled: !!timeParam,
  });

  return {
    aggregate: query.data?.data,
    isLoading: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}
