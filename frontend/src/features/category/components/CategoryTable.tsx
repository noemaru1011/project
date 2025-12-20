import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { categoryLabels } from '@/features/category/constants';
import { useCategoryList } from '@/features/category/hooks/useCategoryList';

export const CategoryTable = () => {
  const { data, loading } = useCategoryList();

  return (
    <Loading loading={loading}>
      <Table labels={categoryLabels} data={data} keyField="categoryId" />
    </Loading>
  );
};
