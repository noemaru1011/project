import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
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
