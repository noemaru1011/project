import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { historyResultLabels } from '@/features/history/constants/historyLabels';
import type { HistoryResult } from '@/features/history/types';
import type { Action } from '@/components/ui/Table/TableRowActions';
import { ROUTES } from '@/constants/routes';

type Props = {
  data?: HistoryResult[];
  loading: boolean;
  actions?: Action[];
};

export const HistoryTable = ({ data, loading, actions = ['Update', 'Delete'] }: Props) => {
  const routeMap: Partial<Record<Action, (id: string) => string>> = {
    Update: (id) => ROUTES.HISTORY.UPDATE(id),
    Delete: (id) => ROUTES.HISTORY.DELETE(id),
  };

  return (
    <Loading loading={loading}>
      <Table
        labels={historyResultLabels}
        data={data ?? []}
        keyField="historyId"
        actions={actions}
        routeMap={routeMap}
      />
    </Loading>
  );
};
