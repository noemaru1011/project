import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAll } from '@/hooks/useFetchAll';
import { departmentApi } from '@/features/department';
import type { Department } from '@/features/department';
import { handleApiError } from '@/utils/handleApiError';

export const useDepartmentList = () => {
  const navigate = useNavigate();
  const { data, fetchAll, loading } = useFetchAll<Department>(departmentApi.index);

  useEffect(() => {
    fetchAll().catch((err) => handleApiError(err, navigate));
  }, []);

  return { data, loading };
};
