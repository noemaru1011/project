import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { Hooks } from "@/hooks/hooks";
import { MinorCategoryLabels } from "@/types/minorCategory";
import { MinorCategoryApi } from "@/api/minorCategoryApi";
import type { MinorCategory } from "@shared/schemas/minorCategory";

const MinorCategoryIndex = () => {
  const {
    data: MinorCategories,
    fetchAll,
    loading,
  } = Hooks<MinorCategory>(MinorCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={MinorCategoryLabels}
        data={MinorCategories}
        keyField="minorCategoryId"
      />
    </Loading>
  );
};

export default MinorCategoryIndex;
