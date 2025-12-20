import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { statusLabels } from '@/features/status/constants';
import { useStatusList } from '@/features/status/hooks/useStatusList';

export const StatusTable = () => {
  const { data, loading } = useStatusList();

  return (
    <Loading loading={loading}>
      <Table labels={statusLabels} data={data} keyField="statusId" />
    </Loading>
  );
};
