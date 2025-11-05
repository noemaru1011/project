import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useMinorCategory } from "@/hooks/MinorCategoryHooks";
import { MinorCategoryLabels } from "@/types/minorCategory";

const MinorCategoryIndex = () => {
  const {
    data: MinorCategories,
    fetchAll,
    loading,
    error,
  } = useMinorCategory();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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
