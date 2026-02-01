import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { historyResultLabels } from '@/features/history/constants/historyLabels';
import type { HistorySummary } from '@shared/models/history';
import type { Action } from '@/components/ui/Table/TableRowActions';
import { ROUTES } from '@/routes/routes';

type Props = {
  data?: HistorySummary[];
  loading: boolean;
  actions?: Action[];
};

export const HistoryTable = ({ data, loading, actions = ['Update', 'Delete'] }: Props) => {
  const routeMap: Partial<Record<Action, (id: string) => string>> = {
    Update: (id: string) => ROUTES.HISTORY.UPDATE(id),
    Delete: (id: string) => ROUTES.HISTORY.DELETE(id),
  };

  return (
    <Loading loading={loading}>
      <Table<HistorySummary>
        labels={historyResultLabels}
        data={data ?? []}
        keyField="historyId"
        actions={actions}
        onAction={routeMap}
      />
    </Loading>
  );
};
