import { useEffect } from 'react';
import { Table } from '@/components/elements/Table';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { DepartmentLabels } from '@/constants/departmentLabels';
import { DepartmentAPi } from '@/api/departmentApi';
import type { DisplayDepartment } from '@/types/displayDepartment';

export const DepartmentIndex = () => {
  const { data: Departments, fetchAll, loading } = useCrud<DisplayDepartment>(DepartmentAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={DepartmentLabels} data={Departments} keyField="departmentId" />
    </Loading>
  );
};
