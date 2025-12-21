import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
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
