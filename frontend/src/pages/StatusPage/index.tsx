import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { Hooks } from "@/hooks/hooks";
import { StatusLabels } from "@/types/status";
import { StatusAPi } from "@/api/statusApi";
import type { Status } from "@shared/schemas/status";

const StatusIndex = () => {
  const { data: Status, fetchAll, loading } = Hooks<Status>(StatusAPi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={StatusLabels} data={Status} keyField="statusId" />
    </Loading>
  );
};

export default StatusIndex;
