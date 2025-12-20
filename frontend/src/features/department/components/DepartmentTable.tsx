import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { departmentLabels } from '@/features/department/constants';
import { useDepartmentList } from '@/features/department/hooks/useDepartmentList';

export const DepartmentTable = () => {
  const { data, loading } = useDepartmentList();

  return (
    <Loading loading={loading}>
      <Table labels={departmentLabels} data={data} keyField="departmentId" />
    </Loading>
  );
};
