import { Table } from "@/components/layouts/Table";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import { useSubCategory } from "@/hooks/SubCategoryHooks";
import { SubCategoryLabels } from "@/types/subCategory";

const SubCategoryIndex = () => {
  const { data: subCategories, loading, error } = useSubCategory();

  return (
    <LoadAndError loading={loading} error={error}>
      <Table
        labels={SubCategoryLabels}
        data={subCategories}
        keyField="subCategoryId"
        showActions={false}
      />
    </LoadAndError>
  );
};

export default SubCategoryIndex;
