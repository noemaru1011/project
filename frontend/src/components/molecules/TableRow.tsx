import type { Action } from '@/components/molecules/TableRowActions';
import { RowActions } from '@/components/molecules/TableRowActions';

type Props = {
  rowKey: string;
  labelKeys: string[];
  row: Record<string, string>;
  actions?: Action[];
  routeMap?: Record<Action, (id: string) => string>;
  showCheckbox?: boolean;
  selectedIds?: string[];
  onSelect?: (id: string, checked: boolean) => void;
};

export const TableRow = ({
  rowKey,
  labelKeys,
  row,
  actions,
  routeMap,
  selectedIds = [],
  showCheckbox,
  onSelect,
}: Props) => {
  return (
    <tr className="border-b">
      {showCheckbox && (
        <td className="px-4 py-2 text-center">
          <input
            type="checkbox"
            checked={selectedIds.includes(rowKey)}
            onChange={(e) => onSelect?.(rowKey, e.target.checked)}
          />
        </td>
      )}

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
