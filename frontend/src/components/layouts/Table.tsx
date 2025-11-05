import Button from "@/components/elements/Button";

type Props<T> = {
  labels: Record<string, string>; // 表示用ラベル
  data: T[];
  keyField: string; // 一意キー
  showActions?: boolean;
};

// ネストされたオブジェクトをフラット化するヘルパー
function flattenObject(obj: any, prefix = "", res: any = {}): any {
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

export function Table<T extends Record<string, any>>({
  labels,
  data,
  keyField,
  showActions = true,
}: Props<T>) {
  const labelKeys = Object.keys(labels); // string[] で扱う

  return (
    <div className="flex justify-center m-4">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-[200px]">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              {labelKeys.map((key) => (
                <th key={key} className="p-2 text-center">
                  {labels[key]}
                </th>
              ))}
              {showActions && (
                <th className="p-2 text-center w-[240px]">操作</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const flatRow = flattenObject(row); // ネストをフラット化
              return (
                <tr
                  key={String(row[keyField])}
                  className="border-b border-gray-300"
                >
                  {labelKeys.map((key) => (
                    <td key={key} className="p-2 text-center">
                      {flatRow[key] !== undefined ? String(flatRow[key]) : ""}
                    </td>
                  ))}

                  {showActions && (
                    <td className="p-2 flex justify-center gap-2">
                      <Button variant="Read" />
                      <Button variant="Update" />
                      <Button variant="Delete" />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
