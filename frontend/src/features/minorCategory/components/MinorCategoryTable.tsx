import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { minorCategoryLabels } from '@/features/minorCategory/constants';
import { useMinorCategoryList } from '@/features/minorCategory/hooks/useMinorCategoryList';

export const MinorCategoryTable = () => {
  const { data, loading } = useMinorCategoryList();

  return (
    <Loading loading={loading}>
      <Table labels={minorCategoryLabels} data={data} keyField="minorCategoryId" />
    </Loading>
  );
};
