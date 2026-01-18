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
};

export const StudentTable = ({ loading, data, actions }: Props) => {
  const routeMap: Record<Action, (id: string) => string> = {
    Update: (id) => ROUTES.STUDENT.UPDATE(id),
    Read: (id) => ROUTES.STUDENT.VIEW(id),
    Delete: (id) => ROUTES.STUDENT.DELETE(id),
  };

  return (
    <Loading loading={loading}>
      <Table
        labels={studentLabels}
        data={data ?? []}
        keyField="studentId"
        actions={actions}
        routeMap={routeMap}
      />
    </Loading>
  );
};
