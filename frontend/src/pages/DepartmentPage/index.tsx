import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useDepartment } from "@/hooks/DepartmentHooks";
import { DepartmentLabels } from "@/types/department";

const DepartmentIndex = () => {
  const { data: Departments, fetchAll, loading, error } = useDepartment();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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
