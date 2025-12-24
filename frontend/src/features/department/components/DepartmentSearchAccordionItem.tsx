import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { DepartmentCheckboxGroup } from '@/features/department/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  column?: number;
};

export const DepartmentSearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  column,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DepartmentCheckboxGroup
          name={field.name}
          value={field.value.map(String)}
          onChange={(vals) => field.onChange(vals.map(Number))}
          error={fieldState.error?.message}
          column={column}
        />
      )}
    />
  );
};
