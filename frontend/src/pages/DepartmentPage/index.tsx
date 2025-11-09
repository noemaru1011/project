import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useDepartment } from "@/hooks/DepartmentHooks";
import { DepartmentLabels } from "@/types/department";

const DepartmentIndex = () => {
  const { data: Departments, fetchAll, loading } = useDepartment();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={DepartmentLabels}
        data={Departments}
        keyField="departmentId"
        showActions={false}
      />
    </Loading>
  );
};

export default DepartmentIndex;
