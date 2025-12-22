import { Table } from '@/components/ui/Table/Table';
import type { Department } from '@/features/department';
import { departmentLabels } from '@/features/department/constants';

type Props = {
  data: Department[];
};

export const DepartmentTable = ({ data }: Props) => {
  return <Table labels={departmentLabels} data={data} keyField="departmentId" />;
};
