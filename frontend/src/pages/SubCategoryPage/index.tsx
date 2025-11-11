import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { Hooks } from "@/hooks/hooks";
import { SubCategoryLabels } from "@/types/subCategory";
import { SubCategoryApi } from "@/api/subCategoryApi";
import type { SubCategory } from "@shared/schemas/subCategory";

const SubCategoryIndex = () => {
  const {
    data: subCategories,
    fetchAll,
    loading,
  } = Hooks<SubCategory>(SubCategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={SubCategoryLabels}
        data={subCategories}
        keyField="subCategoryId"
      />
    </Loading>
  );
};

export default SubCategoryIndex;
