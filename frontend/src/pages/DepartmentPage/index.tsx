import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useCrud } from "@/hooks/useCrud";
import { DepartmentLabels } from "@/types/department";
import { DepartmentAPi } from "@/api/departmentApi";
import type { Department } from "@shared/schemas/department";

export const DepartmentIndex = () => {
  const {
    data: Departments,
    fetchAll,
    loading,
  } = useCrud<Department>(DepartmentAPi);

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
