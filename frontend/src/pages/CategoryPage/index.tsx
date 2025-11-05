import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "@/components/layouts/Table";
import { Loading } from "@/components/elements/Loading";
import { useCategory } from "@/hooks/CategoryHooks";
import { CategoryLabels } from "@/types/category";

const CategoryIndex = () => {
  const { data: Categories, fetchAll, loading } = useCategory();

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
        labels={CategoryLabels}
        data={Categories}
        keyField="categoryId"
        showActions={false}
      />
    </Loading>
  );
};

export default CategoryIndex;
