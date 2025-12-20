import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
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
