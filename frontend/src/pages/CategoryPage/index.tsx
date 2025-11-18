import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { CategoryLabels } from '@/types/categoryLabels';
import { CategoryApi } from '@/api/categoryApi';
import type { Category } from '@shared/schemas/category';

export const CategoryIndex = () => {
  const { data: Categories, fetchAll, loading } = useCrud<Category>(CategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={CategoryLabels} data={Categories} keyField="categoryName" />
    </Loading>
  );
};
