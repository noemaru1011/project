import { useEffect } from 'react';
import { Table } from '@/components/atoms/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { StatusLabels } from '@/constants/statusLabels';
import { StatusAPi } from '@/api/statusApi';
import type { DisplayStatus } from '@/types/displayStatus';

export const StatusIndex = () => {
  const { data: Status, fetchAll, loading } = useCrud<DisplayStatus>(StatusAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={StatusLabels} data={Status} keyField="statusName" />
    </Loading>
  );
};
