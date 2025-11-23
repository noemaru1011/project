import type { DisplayLabels } from '@/types/ui';
import { TableHead } from '@/components/elements/TableHead';
import { TableRow } from '@/components/elements/TableRow';
type Props<T> = {
  labels: DisplayLabels;
  data: T[];
  keyField: keyof T & string;
};

// ─────────────────────────────
// ネストされたオブジェクトをドット区切りキーで展開
// ─────────────────────────────
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

export function Table<T extends Record<string, any>>({ labels, data, keyField }: Props<T>) {
  const flatLabels = flattenObject(labels);
  const labelKeys = Object.keys(flatLabels);

  return (
    <div className="flex justify-center m-4">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-[200px]">
          <TableHead labelKeys={labelKeys} flatLabels={flatLabels} />

          <tbody>
            {data.map((row) => {
              const flatRow = flattenObject(row);
              return (
                <TableRow
                  key={String(row[keyField])}
                  rowKey={row[keyField]}
                  labelKeys={labelKeys}
                  flatRow={flatRow}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
