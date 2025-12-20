import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAll } from '@/hooks/useFetchAll';
import { minorCategoryApi } from '@/features/minorCategory';
import type { MinorCategory } from '@/features/minorCategory';
import { handleApiError } from '@/utils/handleApiError';

export const useMinorCategoryList = () => {
  const navigate = useNavigate();
  const { data, fetchAll, loading } = useFetchAll<MinorCategory>(minorCategoryApi.index);

  useEffect(() => {
    fetchAll().catch((err) => handleApiError(err, navigate));
  }, []);

  return { data, loading };
};
