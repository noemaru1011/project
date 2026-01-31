import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { historyApi } from '@/features/history/api';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentSearchInput } from '@shared/models/student';

export function useSearchHistories(params: StudentSearchInput | null) {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['histories', 'search', params],
    queryFn: async () => {
      const res = await historyApi.search(params!);
      toast.info(res.message);
      return res;
    },
    enabled: !!params,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  return {
    histories: query.data?.data ?? [],
    loading: query.isFetching,
  };
}
