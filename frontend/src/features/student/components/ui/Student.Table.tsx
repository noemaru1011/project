import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/ui/Table/Table';
import { studentLabels } from '@/features/student/constants';
import type { StudentSummary } from '@shared/models/student';
import type { Action } from '@/components/ui/Table/TableRowActions';
import { ROUTES } from '@/routes/routes';
import { Loading } from '@/components/ui/Loading/Loading';

type Props = {
  loading: boolean;
  data: StudentSummary[];
  actions?: Action[];
  onDelete: (id: string) => void;
};

export const StudentTable = ({ loading, data, actions, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleAction: Partial<Record<Action, (id: string) => void>> = {
    Read: (id) => navigate(ROUTES.STUDENT.VIEW(id)),
    Update: (id) => navigate(ROUTES.STUDENT.UPDATE(id)),
    Delete: (id) => onDelete(id),
  };

  return (
    <Loading loading={loading}>
      <Table
        labels={studentLabels}
        data={data ?? []}
        keyField="studentId"
        actions={actions}
        onAction={handleAction}
      />
    </Loading>
  );
};
