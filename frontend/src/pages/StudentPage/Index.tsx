import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { StudentLabels } from '@/constants/studentLabels';
import { StudentApi } from '@/api/studentApi';
import type { Student } from '@/interface/student';

export const StudentIndex = () => {
  const { data: student, fetchAll, loading } = useFetchAll<Student>(StudentApi.index);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={StudentLabels} data={student} keyField="studentId" />
    </Loading>
  );
};
