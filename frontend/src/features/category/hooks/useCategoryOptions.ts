import { useMemo } from 'react';
import { useCategoryList } from '@/features/category/hooks//useCategoryList';
import { categoriesToOptions } from '@/features/category/';

export const useCategoryOptions = () => {
  const { data, loading } = useCategoryList();

  const options = useMemo(() => categoriesToOptions(data), [data]);

  return { options, loading };
};
