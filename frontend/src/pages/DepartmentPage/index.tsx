import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useDepartment } from "@/hooks/DepartmentHooks";
import { DepartmentLabels } from "@/types/department";

const DepartmentIndex = () => {
  const { data: Departments, fetchAll, loading } = useDepartment();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAll();
      } catch (err: any) {
        toast.error(err.message || "予期せぬエラーが発生しました");
      }
    };

    fetchData();
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
