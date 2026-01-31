import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { historyApi } from '@/features/history/api';
import { handleApiErrorWithUI } from '@/utils';

export function useAggregateHistories(timeParam: string | null) {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['histories', 'aggregate', timeParam],
    queryFn: async () => {
      const res = await historyApi.searchByTime(timeParam!);
      toast.info(res.message);
      return res;
    },
    enabled: !!timeParam,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  return {
    aggregate: query.data?.data,
    loading: query.isFetching,
  };
}
