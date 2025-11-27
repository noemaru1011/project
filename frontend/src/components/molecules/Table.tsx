import type { DisplayLabels } from '@/interface/ui';
import { TableHead } from '@/components/atoms/TableHead';
import { TableRow } from '@/components/atoms/TableRow';
import type { Action } from '@/components/molecules/RowActions';

type Props<T> = {
  /** 表示するラベルの定義オブジェクト(ネストも可)*/
  labels: DisplayLabels;
  /** 表示するデータの配列 */
  data: T[];
  /** 識別IDはdataに含まれる */
  keyField: keyof T & string;
  /** 表示するアクションの種類 */
  actions?: Action[];
  /** 表示するアクションの種類 */
  routeMap?: Record<Action, (id: string) => string>;
};

// ネストをフラットにする共通処理
function flattenObject(obj: any, prefix = '', res: Record<string, any> = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

export function Table<T extends Record<string, any>>({
  labels,
  data,
  keyField,
  actions,
  routeMap,
}: Props<T>) {
  const flatLabels = flattenObject(labels);
  const labelKeys = Object.keys(flatLabels);

  return (
    <div className="flex justify-center m-4">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-[200px]">
          <TableHead labelKeys={labelKeys} flatLabels={flatLabels} actions={actions} />

          <tbody>
            {data.map((row) => {
              const flatRow = flattenObject(row);
              return (
                <TableRow
                  key={String(row[keyField])}
                  rowKey={String(row[keyField])}
                  labelKeys={labelKeys}
                  flatRow={flatRow}
                  actions={actions}
                  routeMap={routeMap}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
