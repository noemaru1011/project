import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { departmentApi } from '@/features/department';
import { departmentsToOptions } from '@/features/department/utils/mapper';

export const useDepartmentOptions = () => {
  // 1. API 取得
  const { data: response, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentApi.index(),
    staleTime: Infinity, // マスタデータなので、一度取ったらアプリをリロードするまで再取得しない
    gcTime: 1000 * 60 * 60 * 24, // 24時間キャッシュを保持
  });

  const data = response?.data ?? [];

  // 2. マッピング
  const options = useMemo(() => departmentsToOptions(data), [data]);

  return { data, options, isLoading };
};
