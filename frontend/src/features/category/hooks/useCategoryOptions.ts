import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/features/category';
import { categoriesToOptions } from '@/features/category/utils/mapper';

export const useCategoryOptions = () => {
  // 1. API 取得
  const { data: response, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.index(),
    staleTime: Infinity, // マスタデータなので、一度取ったらアプリをリロードするまで再取得しない
    gcTime: 1000 * 60 * 60 * 24, // 24時間キャッシュを保持
  });

  const data = response?.data ?? [];

  // 2. マッピング
  const options = useMemo(() => categoriesToOptions(data), [data]);

  return { data, options, isLoading };
};
