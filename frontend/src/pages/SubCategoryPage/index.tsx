import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { SubCategoryLabels } from '@/constants/subCategoryLabels';
import { SubCategoryApi } from '@/api/subCategoryApi';
import type { SubCategory } from '@/interface/subCategory';

export const SubCategoryIndex = () => {
  const { data: subCategories, fetchAll, loading } = useCrud<SubCategory>(SubCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={SubCategoryLabels} data={subCategories} keyField="subCategoryName" />
    </Loading>
  );
};
