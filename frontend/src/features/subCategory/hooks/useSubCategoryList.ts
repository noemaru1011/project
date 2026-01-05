import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories } from '@/features/subCategory';
import type { RootState, AppDispatch } from '@/stores/store';

export const useSubCategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.subCategories);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchSubCategories());
    }
  }, [data.length, dispatch]);

  return { data, loading };
};
