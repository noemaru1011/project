import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { StudentLabels } from '@/constants/studentLabels';
import { StudentApi } from '@/api/studentApi';
import type { DisplayStudent } from '@/types/displayStudent';

export const StudentIndex = () => {
  const { data: student, fetchAll, loading } = useCrud<DisplayStudent>(StudentApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      {/* id検討 */}
      <Table labels={StudentLabels} data={student} keyField="studentId" />
    </Loading>
  );
};
