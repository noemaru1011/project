import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useSubCategory } from "@/hooks/SubCategoryHooks";
import { SubCategoryLabels } from "@/types/subCategory";

const SubCategoryIndex = () => {
  const { data: subCategories, fetchAll, loading } = useSubCategory();

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
        labels={SubCategoryLabels}
        data={subCategories}
        keyField="subCategoryId"
        showActions={false}
      />
    </Loading>
  );
};

export default SubCategoryIndex;
