import { Table } from "@/components/layouts/Table";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import { useMinorCategory } from "@/hooks/MinorCategoryHooks";
import { MinorCategoryLabels } from "@/types/minorCategory";

const MinorCategoryIndex = () => {
  const { data: MinorCategories, loading, error } = useMinorCategory(true);

  return (
    <LoadAndError loading={loading} error={error}>
      <Table
        labels={MinorCategoryLabels}
        data={MinorCategories}
        keyField="minorCategoryId"
        showActions={false}
      />
    </LoadAndError>
  );
};

export default MinorCategoryIndex;
