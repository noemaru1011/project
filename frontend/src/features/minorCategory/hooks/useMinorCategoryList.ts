import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMinorCategories } from '@/features/minorCategory';
import type { RootState, AppDispatch } from '@/hooks/store';
import { handleApiError } from '@/utils/handleApiError';

export const useMinorCategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.minorCategories);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchMinorCategories()).catch((err) => handleApiError(err, navigate));
    }
  }, []);

  return { data, loading };
};
