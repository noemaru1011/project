import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { SubCategoryLabels } from '@/constants/subCategoryLabels';
import { SubCategoryApi } from '@/api/subCategoryApi';
import type { DisplaySubCategory } from '@/types/displaySubCategory';

export const SubCategoryIndex = () => {
  const { data: subCategories, fetchAll, loading } = useCrud<DisplaySubCategory>(SubCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={SubCategoryLabels} data={subCategories} keyField="subCategoryName" />
    </Loading>
  );
};
