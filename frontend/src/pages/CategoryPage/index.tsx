import { Table } from "@/components/layouts/Table";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import { useCategory } from "@/hooks/CategoryHooks";
import { CategoryLabels } from "@/types/category";

const CategoryIndex = () => {
  const { data: Categories, loading, error } = useCategory(true);

  return (
    <LoadAndError loading={loading} error={error}>
      <Table
        labels={CategoryLabels}
        data={Categories}
        keyField="categoryId"
        showActions={false}
      />
    </LoadAndError>
  );
};

export default CategoryIndex;
