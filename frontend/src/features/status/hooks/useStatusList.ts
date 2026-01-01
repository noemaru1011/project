import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatuses } from '@/features/status';
import type { RootState, AppDispatch } from '@/hooks/store';

export const useStatusList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.statuses);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchStatuses());
    }
  }, [data.length, dispatch]);

  return { data, loading };
};
