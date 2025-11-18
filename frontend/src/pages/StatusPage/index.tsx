import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { StatusLabels } from '@/types/statusLabels';
import { StatusAPi } from '@/api/statusApi';
import type { Status } from '@shared/schemas/status';

export const StatusIndex = () => {
  const { data: Status, fetchAll, loading } = useCrud<Status>(StatusAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={StatusLabels} data={Status} keyField="statusId" />
    </Loading>
  );
};
