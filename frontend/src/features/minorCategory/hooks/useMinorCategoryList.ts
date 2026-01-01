import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMinorCategories } from '@/features/minorCategory';
import type { RootState, AppDispatch } from '@/hooks/store';

export const useMinorCategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.minorCategories);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchMinorCategories());
    }
  }, [data.length, dispatch]);

  return { data, loading };
};
