import { Select } from '@/components/atoms/Select';
import { useCategoryOptions } from '../hooks/useCategoryOptions';

export const CategorySelect = (props: any) => {
  const { options, loading } = useCategoryOptions();

  return <Select options={options} disabled={loading} {...props} />;
};
