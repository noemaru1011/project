import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useMinorCategory } from "@/hooks/MinorCategoryHooks";
import { MinorCategoryLabels } from "@/types/minorCategory";

const MinorCategoryIndex = () => {
  const { data: MinorCategories, fetchAll, loading } = useMinorCategory();

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
        labels={MinorCategoryLabels}
        data={MinorCategories}
        keyField="minorCategoryId"
        showActions={false}
      />
    </Loading>
  );
};

export default MinorCategoryIndex;
