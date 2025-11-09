import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useStatus } from "@/hooks/StatusHooks";
import { StatusLabels } from "@/types/status";

const StatusIndex = () => {
  const { data: Status, fetchAll, loading } = useStatus();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={StatusLabels}
        data={Status}
        keyField="statusId"
        showActions={false}
      />
    </Loading>
  );
};

export default StatusIndex;
