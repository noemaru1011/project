import { useMemo } from 'react';
import { useSubCategoryList } from '@/features/subCategory/hooks/useSubCategoryList';
import { subCategoriesToOptions } from '@/features/subCategory';

export const useSubCategoryOptions = () => {
  const { data, loading } = useSubCategoryList();

  const options = useMemo(() => subCategoriesToOptions(data), [data]);

  return { options, loading };
};
