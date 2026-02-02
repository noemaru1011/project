import { useNavigate } from 'react-router-dom';
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
  onDelete: (id: string) => void;
};

export const HistoryTable = ({
  data,
  loading,
  actions = ['Update', 'Delete'],
  onDelete,
}: Props) => {
  const navigate = useNavigate();

  const handleAction: Partial<Record<Action, (id: string) => void>> = {
    Update: (id) => navigate(ROUTES.HISTORY.UPDATE(id)),
    Delete: (id) => onDelete(id),
  };

  return (
    <Loading loading={loading}>
      <Table<HistorySummary>
        labels={historyResultLabels}
        data={data ?? []}
        keyField="historyId"
        actions={actions}
        onAction={handleAction}
      />
    </Loading>
  );
};
