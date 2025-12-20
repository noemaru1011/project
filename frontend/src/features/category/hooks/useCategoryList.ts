import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAll } from '@/hooks/useFetchAll';
import { categoryApi } from '@/features/category';
import type { Category } from '@/features/category';
import { handleApiError } from '@/utils/handleApiError';

export const useCategoryList = () => {
  const navigate = useNavigate();
  const { data, fetchAll, loading } = useFetchAll<Category>(categoryApi.index);

  useEffect(() => {
    fetchAll().catch((err) => handleApiError(err, navigate));
  }, []);

  return { data, loading };
};
