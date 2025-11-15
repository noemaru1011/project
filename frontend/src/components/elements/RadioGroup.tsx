import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Radio } from "./Radio";
import type { Option } from "@/types/ui";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  control: Control<T>;
};

export const RadioGroup = <T extends FieldValues>({
  name,
  options,
  control,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {options.map(({ value, label }) => (
            <Radio
              key={value}
              id={`${String(name)}_${value}`}
              label={label}
              checked={field.value === value}
              onChange={() => field.onChange(value)}
            />
          ))}
        </>
      )}
    />
  );
};
