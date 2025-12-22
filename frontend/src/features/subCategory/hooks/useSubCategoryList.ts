import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories } from '@/features/subCategory';
import type { RootState, AppDispatch } from '@/hooks/store';
import { handleApiError } from '@/utils/handleApiError';

export const useSubCategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.subCategories);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchSubCategories()).catch((err) => handleApiError(err, navigate));
    }
  }, []);

  return { data, loading };
};
