import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { GradeCheckboxGroup } from '@/features/grade/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  column?: number;
};

export const GradeSearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  column,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <GradeCheckboxGroup
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
