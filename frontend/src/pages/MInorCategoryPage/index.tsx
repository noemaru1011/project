import { useEffect } from 'react';
import { Table } from '@/components/atoms/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { MinorCategoryLabels } from '@/constants/minorCategoryLabels';
import { MinorCategoryApi } from '@/api/minorCategoryApi';
import type { DisplayMinorCategory } from '@/types/displayMinorCategory';

export const MinorCategoryIndex = () => {
  const {
    data: MinorCategories,
    fetchAll,
    loading,
  } = useCrud<DisplayMinorCategory>(MinorCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={MinorCategoryLabels} data={MinorCategories} keyField="minorCategoryId" />
    </Loading>
  );
};
