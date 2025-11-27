import type { Action } from '@/components/molecules/RowActions';

type Props = {
  labelKeys: string[];
  flatLabels: Record<string, string>;
  actions?: Action[];
};

export const TableHead = ({ labelKeys, flatLabels, actions }: Props) => {
  return (
    <thead className="bg-gray-100 border-b-2 border-gray-300">
      <tr>
        {labelKeys.map((key) => (
          <th key={key} className="p-2 text-center">
            {flatLabels[key]}
          </th>
        ))}
        {actions && <th>操作</th>}
      </tr>
    </thead>
  );
};
