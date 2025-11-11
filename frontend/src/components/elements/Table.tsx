import type { DisplayLabels } from "@/types/ui";

type Props<T> = {
  labels: DisplayLabels;
  data: T[];
  keyField: keyof T & string;
};

// ─────────────────────────────
// ネストされたオブジェクトをドット区切りキーで展開
// ─────────────────────────────
function flattenObject(obj: any, prefix = "", res: Record<string, any> = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

// ─────────────────────────────
// Table 本体
// ─────────────────────────────
export function Table<T extends Record<string, any>>({
  labels,
  data,
  keyField,
}: Props<T>) {
  const flatLabels = flattenObject(labels);
  const labelKeys = Object.keys(flatLabels);

  return (
    <div className="flex justify-center m-4">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-[200px]">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              {labelKeys.map((key) => (
                <th key={key} className="p-2 text-center">
                  {flatLabels[key]}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const flatRow = flattenObject(row);

              return (
                <tr
                  key={String(row[keyField])}
                  className="border-b border-gray-300"
                >
                  {labelKeys.map((key) => (
                    <td key={key} className="p-2 text-center">
                      {flatRow[key] ?? ""}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
