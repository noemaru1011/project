import { TableHead } from '@/components/molecules/TableHead';
import { TableRow } from '@/components/molecules/TableRow';
import type { Action } from '@/components/molecules/RowActions';

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
  routeMap?: Record<Action, (id: string) => string>;
};

export function Table<T extends Record<string, any>>({
  labels,
  data,
  keyField,
  actions,
  routeMap,
}: Props<T>) {
  const labelKeys = Object.keys(labels);

  return (
    <div className="m-4">
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-full sm:min-w-max w-full">
          <TableHead labelKeys={labelKeys} labels={labels} actions={actions} />

          <tbody>
            {data.map((row) => (
              <TableRow
                key={String(row[keyField])}
                rowKey={String(row[keyField])}
                labelKeys={labelKeys}
                row={row}
                actions={actions}
                routeMap={routeMap}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
