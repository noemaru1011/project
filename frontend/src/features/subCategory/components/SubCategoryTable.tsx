import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { subCategoryLabels } from '@/features/subCategory/constants';
import { useSubCategoryList } from '@/features/subCategory/hooks/useSubCategoryList';

export const SubCategoryTable = () => {
  const { data, loading } = useSubCategoryList();

  return (
    <Loading loading={loading}>
      <Table labels={subCategoryLabels} data={data} keyField="subCategoryId" />
    </Loading>
  );
};
