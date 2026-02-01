import type { Action } from '@/components/ui/Table/TableRowActions';
import { RowActions } from '@/components/ui/Table/TableRowActions';

type Props = {
  rowKey: string;
  labelKeys: string[];
  row: Record<string, any>;
  actions?: Action[];
  onAction?: Partial<Record<Action, (id: string) => void>>;
  showCheckbox?: boolean;
  selectedIds?: string[];
  onSelect?: (id: string, checked: boolean) => void;
};

export const TableRow = ({
  rowKey,
  labelKeys,
  row,
  actions,
  onAction,
  selectedIds = [],
  showCheckbox,
  onSelect,
}: Props) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
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

      {actions && onAction && (
        <td className="px-4 py-2">
          <div className="flex justify-center">
            <RowActions rowKey={rowKey} actions={actions} onAction={onAction} />
          </div>
        </td>
      )}
    </tr>
  );
};
