import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useCrud } from '@/hooks/useCrud';
import { DepartmentLabels } from '@/constants/departmentLabels';
import { DepartmentAPi } from '@/api/departmentApi';
import type { Department } from '@/interface/department';

export const DepartmentIndex = () => {
  const { data: Departments, fetchAll, loading } = useCrud<Department>(DepartmentAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={DepartmentLabels} data={Departments} keyField="departmentId" />
    </Loading>
  );
};
