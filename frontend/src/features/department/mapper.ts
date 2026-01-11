import type { Department } from '@shared/types/department';
import type { Option } from '@/components/ui/option';

const departmentToOption = (department: Department): Option => ({
  value: String(department.departmentId),
  label: department.departmentName,
});

export const departmentsToOptions = (departments: Department[]): Option[] =>
  departments.map(departmentToOption);
