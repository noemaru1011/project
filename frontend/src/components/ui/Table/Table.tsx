import { TableHead } from '@/components/ui/Table/TableHead';
import { TableRow } from '@/components/ui/Table/TableRow';
import type { Action } from '@/components/ui/Table/TableRowActions';
import clsx from 'clsx';

type Props<T> = {
  /** 表示するラベルの定義オブジェクト*/
  labels: Record<string, string>;
  /** 表示するデータの配列 */
  data: T[];
  /** 識別IDはdataに含まれる */
  keyField: keyof T & string;
  /** 表示するアクションの種類 */
  actions?: Action[];
  /** 表示するアクションの種類 */
  routeMap?: Partial<Record<Action, (id: string) => string>>;
  className?: string;
  tableClassName?: string;
};

// showCheckbox = true の場合
/** チェックボックスの有無 */
type CheckboxProps = {
  showCheckbox: true;
  selectedIds: string[];
  onSelect: (id: string, checked: boolean) => void;
};

// showCheckbox = false または undefined の場合
type NoCheckboxProps = {
  showCheckbox?: false;
  selectedIds?: never;
  onSelect?: never;
};

export type TableProps<T> = Props<T> & (CheckboxProps | NoCheckboxProps);

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const {
    labels,
    data,
    keyField,
    actions,
    routeMap,
    showCheckbox = false,
    selectedIds,
    onSelect,
    className,
    tableClassName,
  } = props;

  const labelKeys = Object.keys(labels);

  return (
    <div className={clsx('m-4', className)}>
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
        <table
          className={clsx(
            'table-auto min-w-full sm:min-w-max w-full overflow-x-auto',
            tableClassName,
          )}
        >
          <TableHead
            labelKeys={labelKeys}
            labels={labels}
            actions={actions}
            showCheckbox={showCheckbox}
          />

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={labelKeys.length + (actions ? 1 : 0)}
                  className="text-center py-4 text-gray-500"
                >
                  データがありません
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <TableRow
                  key={String(row[keyField])}
                  rowKey={String(row[keyField])}
                  labelKeys={labelKeys}
                  row={row}
                  actions={actions}
                  routeMap={routeMap}
                  showCheckbox={showCheckbox}
                  selectedIds={selectedIds}
                  onSelect={onSelect}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
