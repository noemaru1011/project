import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { StudentLabels } from '@/types/studentLabels';
import { StudentApi } from '@/api/studentApi';
import type { Student } from '@shared/schemas/student';

export const StudentIndex = () => {
  const { data: student, fetchAll, loading } = useCrud<Student>(StudentApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      {/* id検討 */}
      <Table labels={StudentLabels} data={student} keyField="email" />
    </Loading>
  );
};
