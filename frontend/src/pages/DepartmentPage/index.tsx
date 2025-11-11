import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { Hooks } from "@/hooks/hooks";
import { DepartmentLabels } from "@/types/department";
import { DepartmentAPi } from "@/api/departmentApi";
import type { Department } from "@shared/schemas/department";

const DepartmentIndex = () => {
  const {
    data: Departments,
    fetchAll,
    loading,
  } = Hooks<Department>(DepartmentAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={DepartmentLabels}
        data={Departments}
        keyField="departmentId"
      />
    </Loading>
  );
};

export default DepartmentIndex;
