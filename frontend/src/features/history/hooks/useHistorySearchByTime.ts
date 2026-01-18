import { useState } from 'react';
import { historySearchApi } from '@/features/history/api';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import type { AggregationData } from '@shared/models/history';

export const useHistorySearchByTime = () => {
  const [data, setData] = useState<AggregationData | null>(null);
  const { loading, start, end } = useLoadingCounter();

  const searchHistoriesByTime = async (query: string) => {
    start();
    try {
      const res = await historySearchApi.searchByTime(query);
      setData(res.data);
      return res;
    } finally {
      end();
    }
  };

  return { data, searchHistoriesByTime, loading };
};
