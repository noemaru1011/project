import { Table } from '@/components/ui/Table/Table';
import { categoryLabels } from '@/features/category/constants';
import type { Category } from '@/features/category';

type Props = {
  data: Category[];
};

export const CategoryTable = ({ data }: Props) => {
  return <Table labels={categoryLabels} data={data} keyField="categoryId" />;
};
