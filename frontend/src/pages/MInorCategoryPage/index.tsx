import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { MinorCategoryLabels } from '@/types/minorCategoryLabels';
import { MinorCategoryApi } from '@/api/minorCategoryApi';
import type { MinorCategory } from '@shared/schemas/minorCategory';

export const MinorCategoryIndex = () => {
  const { data: MinorCategories, fetchAll, loading } = useCrud<MinorCategory>(MinorCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={MinorCategoryLabels} data={MinorCategories} keyField="minorCategoryId" />
    </Loading>
  );
};
