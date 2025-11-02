import { Table } from "@/components/layouts/Table";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import { useDepartment } from "@/hooks/DepartmentHooks";
import { DepartmentLabels } from "@/types/department";

const DepartmentIndex = () => {
  const { data: Departments, loading, error } = useDepartment(true);

  return (
    <LoadAndError loading={loading} error={error}>
      <Table
        labels={DepartmentLabels}
        data={Departments}
        keyField="departmentId"
        showActions={false}
      />
    </LoadAndError>
  );
};

export default DepartmentIndex;
