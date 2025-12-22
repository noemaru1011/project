import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatuses } from '@/features/status';
import type { RootState, AppDispatch } from '@/hooks/store';
import { handleApiError } from '@/utils/handleApiError';

export const useStatusList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.statuses);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchStatuses()).catch((err) => handleApiError(err, navigate));
    }
  }, []);

  return { data, loading };
};
