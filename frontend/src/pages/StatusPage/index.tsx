import { Table } from "@/components/layouts/Table";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import { useStatus } from "@/hooks/StatusHooks";
import { StatusLabels } from "@/types/status";

const StatusIndex = () => {
  const { data: Status, loading, error } = useStatus(true);

  return (
    <LoadAndError loading={loading} error={error}>
      <Table
        labels={StatusLabels}
        data={Status}
        keyField="statusId"
        showActions={false}
      />
    </LoadAndError>
  );
};

export default StatusIndex;
