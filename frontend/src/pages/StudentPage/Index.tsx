import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { Hooks } from "@/hooks/hooks";
import { StudentLabels } from "@/types/student";
import { StudentApi } from "@/api/studentApi";
import type { Student } from "@shared/schemas/student";

const StatusIndex = () => {
  const { data: student, fetchAll, loading } = Hooks<Student>(StudentApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={StudentLabels} data={student} keyField="studentId" />
    </Loading>
  );
};

export default StatusIndex;
