import Button from "@/components/elements/Button";

type Props<T> = {
  labels: Partial<Record<keyof T, string>>;
  data: T[];
  keyField: keyof T;
  showActions?: boolean;
};

export function Table<T extends Record<string, any>>({
  labels,
  data,
  keyField,
  showActions = true,
}: Props<T>) {
  const labelKeys = Object.keys(labels) as (keyof T)[];

  return (
    <div className="flex justify-center m-4">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-[200px]">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              {labelKeys.map((key) => (
                <th key={String(key)} className="p-2 text-center">
                  {labels[key]}
                </th>
              ))}
              {showActions && (
                <th className="p-2 text-center w-[240px]">操作</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={String(row[keyField])}
                className="border-b border-gray-300"
              >
                {labelKeys.map((key) => (
                  <td key={String(key)} className="p-2 text-center">
                    {String(row[key])}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
