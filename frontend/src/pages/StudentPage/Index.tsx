import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { StudentLabels } from '@/constants/studentLabels';
import { StudentApi } from '@/api/studentApi';
import type { Student } from '@/interface/student';
import { ROUTES } from '@/constants/routes';
import { handleApiError } from '@/utils/handleApiError';
import type { Action } from '@/components/molecules/RowActions';

export const StudentIndex = () => {
  const navigate = useNavigate();
  const { data: student, fetchAll, loading } = useFetchAll<Student>(StudentApi.index);

  const actions: Action[] = ['Update', 'Read', 'Delete'];

  const routeMap: Record<Action, (id: string) => string> = {
    Update: (id) => ROUTES.STUDENT.UPDATE(id),
    Read: (id) => ROUTES.STUDENT.VIEW(id),
    Delete: (id) => ROUTES.STUDENT.DELETE(id),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAll();
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };
    fetchData();
  }, []);

  return (
    <Loading loading={loading}>
      <Table
        labels={StudentLabels}
        data={student}
        keyField="studentId"
        actions={actions}
        routeMap={routeMap}
      />
    </Loading>
  );
};
