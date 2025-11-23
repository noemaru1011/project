type Props = {
  labelKeys: string[];
  flatLabels: Record<string, string>;
};

export const TableHead = ({ labelKeys, flatLabels }: Props) => {
  return (
    <thead className="bg-gray-100 border-b-2 border-gray-300">
      <tr>
        {labelKeys.map((key) => (
          <th key={key} className="p-2 text-center">
            {flatLabels[key]}
          </th>
        ))}
      </tr>
    </thead>
  );
};
