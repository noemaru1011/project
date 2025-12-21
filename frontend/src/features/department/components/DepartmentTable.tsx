import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
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
