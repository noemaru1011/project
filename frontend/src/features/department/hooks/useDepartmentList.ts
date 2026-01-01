import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '@/features/department';
import type { RootState, AppDispatch } from '@/hooks/store';

export const useDepartmentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.departments);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchDepartments());
    }
  }, [data.length, dispatch]);

  return { data, loading };
};
