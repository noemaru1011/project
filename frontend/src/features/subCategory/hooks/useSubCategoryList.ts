import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAll } from '@/hooks/useFetchAll';
import { subCategoryApi } from '@/features/subCategory';
import type { SubCategory } from '@/features/subCategory';
import { handleApiError } from '@/utils/handleApiError';

export const useSubCategoryList = () => {
  const navigate = useNavigate();
  const { data, fetchAll, loading } = useFetchAll<SubCategory>(subCategoryApi.index);

  useEffect(() => {
    fetchAll().catch((err) => handleApiError(err, navigate));
  }, []);

  return { data, loading };
};
