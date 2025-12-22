import { Table } from '@/components/ui/Table/Table';
import { statusLabels } from '@/features/status/constants';
import type { Status } from '@/features/status/types';

type Props = {
  data: Status[];
};

export const StatusTable = ({ data }: Props) => {
  return <Table labels={statusLabels} data={data} keyField="statusId" />;
};
