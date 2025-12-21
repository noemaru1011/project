import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '@/features/department';
import type { RootState, AppDispatch } from '@/hooks/store';
import { handleApiError } from '@/utils/handleApiError';

export const useDepartmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.departments);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchDepartments()).catch((err) => handleApiError(err, navigate));
    }
  }, [data.length, dispatch]);

  return { data, loading };
};
