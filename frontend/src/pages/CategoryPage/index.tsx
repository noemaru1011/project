import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { CategoryLabels } from '@/constants/categoryLabels';
import { CategoryApi } from '@/api/categoryApi';
import type { DisplayCategory } from '@/types/displayCategory';

export const CategoryIndex = () => {
  const { data: Categories, fetchAll, loading } = useCrud<DisplayCategory>(CategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={CategoryLabels} data={Categories} keyField="categoryId" />
    </Loading>
  );
};
