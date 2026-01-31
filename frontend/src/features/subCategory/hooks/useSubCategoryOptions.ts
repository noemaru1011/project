import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { subCategoryApi } from '@/features/subCategory';
import { subCategoriesToOptions } from '@/features/subCategory/utils/mapper';

export const useSubCategoryOptions = () => {
  // 1. API 取得
  const { data: response, isLoading } = useQuery({
    queryKey: ['subCategories'],
    queryFn: () => subCategoryApi.index(),
    staleTime: Infinity, // マスタデータなので、一度取ったらアプリをリロードするまで再取得しない
    gcTime: 1000 * 60 * 60 * 24, // 24時間キャッシュを保持
  });

  const data = response?.data ?? [];

  // 2. マッピング
  const options = useMemo(() => subCategoriesToOptions(data), [data]);

  return { data, options, isLoading };
};
