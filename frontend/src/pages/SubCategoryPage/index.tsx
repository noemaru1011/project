import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useSubCategory } from "@/hooks/SubCategoryHooks";
import { SubCategoryLabels } from "@/types/subCategory";

const SubCategoryIndex = () => {
  const { data: subCategories, fetchAll, loading, error } = useSubCategory();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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
