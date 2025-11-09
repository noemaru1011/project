import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useMinorCategory } from "@/hooks/MinorCategoryHooks";
import { MinorCategoryLabels } from "@/types/minorCategory";

const MinorCategoryIndex = () => {
  const { data: MinorCategories, fetchAll, loading } = useMinorCategory();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={MinorCategoryLabels}
        data={MinorCategories}
        keyField="minorCategoryId"
        showActions={false}
      />
    </Loading>
  );
};

export default MinorCategoryIndex;
