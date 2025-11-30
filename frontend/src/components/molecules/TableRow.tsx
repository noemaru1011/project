import type { Action } from '@/components/molecules/RowActions';
import { RowActions } from '@/components/molecules/RowActions';

type Props = {
  rowKey: string;
  labelKeys: string[];
  row: Record<string, string>;
  actions?: Action[];
  routeMap?: Record<Action, (id: string) => string>;
};

export const TableRow = ({ rowKey, labelKeys, row, actions, routeMap }: Props) => {
  return (
    <tr className="border-b">
      {labelKeys.map((key) => (
        <td key={key} className="px-4 py-2 text-center">
          {row[key]}
        </td>
      ))}

      {actions && routeMap && (
        <td className="px-4 py-2 flex justify-center">
          <RowActions rowKey={String(rowKey)} actions={actions} routeMap={routeMap} />
        </td>
      )}
    </tr>
  );
};
