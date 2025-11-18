import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { SubCategoryLabels } from '@/types/subCategoryLabels';
import { SubCategoryApi } from '@/api/subCategoryApi';
import type { SubCategory } from '@shared/schemas/subCategory';

export const SubCategoryIndex = () => {
  const { data: subCategories, fetchAll, loading } = useCrud<SubCategory>(SubCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={SubCategoryLabels} data={subCategories} keyField="subCategoryId" />
    </Loading>
  );
};
