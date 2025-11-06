import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useStatus } from "@/hooks/StatusHooks";
import { StatusLabels } from "@/types/status";

const StatusIndex = () => {
  const { data: Status, fetchAll, loading } = useStatus();

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
        labels={StatusLabels}
        data={Status}
        keyField="statusId"
        showActions={false}
      />
    </Loading>
  );
};

export default StatusIndex;
