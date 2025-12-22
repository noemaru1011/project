import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/features/category';
import type { RootState, AppDispatch } from '@/hooks/store';
import { handleApiError } from '@/utils/handleApiError';

export const useCategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchCategories()).catch((err) => handleApiError(err, navigate));
    }
  }, []);

  return { data, loading };
};
