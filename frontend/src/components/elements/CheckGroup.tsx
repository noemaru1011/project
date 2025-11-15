import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "./Checkbox";
import type { Option } from "@/types/ui";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  control: Control<T>;
  columns?: number; // 追加: 列数
};

export const CheckGroup = <T extends FieldValues>({
  name,
  options,
  control,
  columns = 1,
}: Props<T>) => {
  const toggleValue = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  // 配列を columns ごとに分割して縦列に
  const chunkArray = (arr: Option[], size: number) => {
    const result: Option[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(options, Math.ceil(options.length / columns));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col gap-1">
              {row.map(({ value, label }) => (
                <Checkbox
                  key={value}
                  id={`${String(name)}_${value}`}
                  label={label}
                  checked={field.value?.includes(value)}
                  onChange={() =>
                    field.onChange(toggleValue(field.value, value))
                  }
                />
              ))}
            </div>
          ))}
        </div>
      )}
    />
  );
};
