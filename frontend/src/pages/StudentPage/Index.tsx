import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useStudent } from "@/hooks/StudentHooks";
import { StudentLabels } from "@/types/student";

const StatusIndex = () => {
  const { data: student, fetchAll, loading } = useStudent();

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
        labels={StudentLabels}
        data={student}
        keyField="studentId"
        showActions={true}
      />
    </Loading>
  );
};

export default StatusIndex;
