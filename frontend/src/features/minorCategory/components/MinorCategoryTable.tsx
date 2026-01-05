import { Table } from '@/components/ui/Table/Table';
import { minorCategoryLabels } from '@/features/minorCategory/constants';
import type { MinorCategory } from '@/features/minorCategory';

type Props = {
  data: MinorCategory[];
};

export const MinorCategoryTable = ({ data }: Props) => {
  return <Table labels={minorCategoryLabels} data={data} keyField="minorCategoryId" />;
};
