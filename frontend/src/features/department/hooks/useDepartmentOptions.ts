import { useMemo } from 'react';
import { useDepartmentList } from '@/features/department/hooks/useDepartmentList';
import { departmentsToOptions } from '@/features/department';

export const useDepartmentOptions = () => {
  const { data, loading } = useDepartmentList();

  const options = useMemo(() => departmentsToOptions(data), [data]);

  return { options, loading };
};
