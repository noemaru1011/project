import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useSubCategory } from "@/hooks/SubCategoryHooks";
import { SubCategoryLabels } from "@/types/subCategory";

const SubCategoryIndex = () => {
  const { data: subCategories, fetchAll, loading } = useSubCategory();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table
        labels={SubCategoryLabels}
        data={subCategories}
        keyField="subCategoryId"
        showActions={false}
      />
    </Loading>
  );
};

export default SubCategoryIndex;
