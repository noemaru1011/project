import type { Department } from '@shared/models/master';
import type { Option } from '@/components/ui/option';

const departmentToOption = (department: Department): Option => ({
  value: String(department.departmentId),
  label: department.departmentName,
});

export const departmentsToOptions = (departments: Department[]): Option[] =>
  departments.map(departmentToOption);
