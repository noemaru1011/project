import { useEffect } from "react";
import { Table } from "@/components/elements/Table";
import { Loading } from "@/components/elements/Loading";
import { Hooks } from "@/hooks/hooks";
import { CategoryLabels } from "@/types/category";
import { CategoryApi } from "@/api/categoryApi";
import type { Category } from "@shared/schemas/category";

const CategoryIndex = () => {
  const { data: Categories, fetchAll, loading } = Hooks<Category>(CategoryApi);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Loading loading={loading}>
      <Table labels={CategoryLabels} data={Categories} keyField="categoryId" />
    </Loading>
  );
};

export default CategoryIndex;
