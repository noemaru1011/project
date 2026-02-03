import { useQuery } from '@tanstack/react-query';
import { historyApi } from '@/features/history/api';
import type { StudentSearchInput } from '@shared/models/student';

export function useSearchHistories(params: StudentSearchInput | null) {
  const query = useQuery({
    queryKey: ['histories', 'search', params],
    queryFn: () => historyApi.search(params!),
    // params がある時だけ実行
    enabled: !!params,
  });

  return {
    histories: query.data?.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}
