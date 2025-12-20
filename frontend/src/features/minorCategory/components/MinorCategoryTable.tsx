import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { minorCategoryLabels } from '@/features/minorCategory/constants';
import { useMinorCategoryList } from '@/features/minorCategory/hooks/useMinorCategory';

export const MinorCategoryTable = () => {
  const { data, loading } = useMinorCategoryList();

  return (
    <Loading loading={loading}>
      <Table labels={minorCategoryLabels} data={data} keyField="minorCategoryId" />
    </Loading>
  );
};
