import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/features/category';
import type { RootState, AppDispatch } from '@/stores/store';

export const useCategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((s: RootState) => s.categories);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchCategories());
    }
  }, [data.length, dispatch]);

  return { data, loading };
};
