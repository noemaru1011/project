import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { useCategory } from "@/hooks/CategoryHooks";
import { CategoryLabels } from "@/types/category";

const CategoryIndex = () => {
  const { data: Categories, fetchAll, loading } = useCategory();

  useEffect(() => {
    fetchAll();
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
