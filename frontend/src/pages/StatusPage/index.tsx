import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useStatus } from "@/hooks/StatusHooks";
import { StatusLabels } from "@/types/status";

const StatusIndex = () => {
  const { data: Status, fetchAll, loading, error } = useStatus();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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
