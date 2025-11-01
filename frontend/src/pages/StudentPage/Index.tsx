import { Table } from "@/components/layouts/Table";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import Input from "@/components/elements/Input";
import { useStatus } from "@/hooks/StatusHooks";
import { StatusLabels } from "@/types/status";
import { studentQuery } from "@shared/schemas/Student";

const StudnetIndex = () => {
  //const { data: Status, loading, error } = useStatus();

  return (
    <div>
      <div>
        <Input type="text" label="学生名" id="studentName" />
      </div>
      {/* <LoadAndError loading={loading} error={error}>
        <Table
          labels={StatusLabels}
          data={Status}
          keyField="statusId"
          showActions={false}
        />
      </LoadAndError> */}
    </div>
  );
};

export default StudnetIndex;
