import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { CategoryLabels } from '@/constants/categoryLabels';
import { CategoryApi } from '@/api/categoryApi';
import type { Category } from '@/interface/category';

export const CategoryIndex = () => {
  const { data: Categories, fetchAll, loading } = useFetchAll<Category>(CategoryApi.index);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={CategoryLabels} data={Categories} keyField="categoryId" />
    </Loading>
  );
};
