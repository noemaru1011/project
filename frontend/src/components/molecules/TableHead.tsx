import type { Action } from '@/components/molecules/TableRowActions';

type Props = {
  labelKeys: string[];
  labels: Record<string, string>;
  actions?: Action[];
  showCheckbox?: boolean;
};

export const TableHead = ({ labelKeys, labels, actions, showCheckbox }: Props) => {
  return (
    <thead className="bg-gray-100 border-b-2 border-gray-300">
      <tr>
        {showCheckbox && <th className="px-4 py-2">チェック</th>}
        {labelKeys.map((key) => (
          <th key={key} className="p-2 text-center">
            {labels[key]}
          </th>
        ))}
        {actions && <th>操作</th>}
      </tr>
    </thead>
  );
};
