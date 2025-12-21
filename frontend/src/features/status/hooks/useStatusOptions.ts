import { useMemo } from 'react';
import { useStatusList } from '@/features/status/hooks//useStatusList';
import { statusesToOptions } from '@/features/status/';

export const useStatusOptions = () => {
  const { data, loading } = useStatusList();

  const options = useMemo(() => statusesToOptions(data), [data]);

  return { options, loading };
};
