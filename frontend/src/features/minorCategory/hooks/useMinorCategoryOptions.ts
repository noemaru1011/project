import { useMemo } from 'react';
import { useMinorCategoryList } from '@/features/minorCategory/hooks/useMinorCategoryList';
import { minorCategoriesToOptions } from '@/features/minorCategory/';

export const useMinorCategoryOptions = () => {
  const { data, loading } = useMinorCategoryList();

  const options = useMemo(() => minorCategoriesToOptions(data), [data]);

  return { options, loading };
};
