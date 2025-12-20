import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAll } from '@/hooks/useFetchAll';
import { statusApi } from '@/features/status';
import type { Status } from '@/features/status';
import { handleApiError } from '@/utils/handleApiError';

export const useStatusList = () => {
  const navigate = useNavigate();
  const { data, fetchAll, loading } = useFetchAll<Status>(statusApi.index);

  useEffect(() => {
    fetchAll().catch((err) => handleApiError(err, navigate));
  }, []);

  return { data, loading };
};
