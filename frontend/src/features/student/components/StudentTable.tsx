import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { studentLabels } from '@/features/student/constants';
import type { StudentResult } from '@/features/student/types';
import type { Action } from '@/components/molecules/TableRowActions';
import { ROUTES } from '@/constants/routes';

type Props = {
  data?: StudentResult[];
  loading: boolean;
  actions?: Action[];
};

export const StudentTable = ({ data, loading, actions = ['Update', 'Read', 'Delete'] }: Props) => {
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
