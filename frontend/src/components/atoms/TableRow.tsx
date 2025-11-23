type Props = {
  labelKeys: string[];
  flatRow: Record<string, any>;
  rowKey: string;
};

export const TableRow = ({ labelKeys, flatRow, rowKey }: Props) => {
  return (
    <tr key={rowKey} className="border-b border-gray-300">
      {labelKeys.map((key) => (
        <td key={key} className="p-2 text-center">
          {flatRow[key] ?? ''}
        </td>
      ))}
    </tr>
  );
};
