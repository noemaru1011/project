import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { StatusLabels } from '@/constants/statusLabels';
import { StatusAPi } from '@/api/statusApi';
import type { Status } from '@/interface/status';

export const StatusIndex = () => {
  const { data: Status, fetchAll, loading } = useCrud<Status>(StatusAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={StatusLabels} data={Status} keyField="statusName" />
    </Loading>
  );
};
