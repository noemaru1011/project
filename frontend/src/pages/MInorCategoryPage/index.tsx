import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { MinorCategoryLabels } from '@/constants/minorCategoryLabels';
import { MinorCategoryApi } from '@/api/minorCategoryApi';
import type { MinorCategory } from '@/interface/minorCategory';

export const MinorCategoryIndex = () => {
  const {
    data: MinorCategories,
    fetchAll,
    loading,
  } = useFetchAll<MinorCategory>(MinorCategoryApi.index);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={MinorCategoryLabels} data={MinorCategories} keyField="minorCategoryId" />
    </Loading>
  );
};
