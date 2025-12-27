import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { GradeCheckboxGroup } from '@/features/grade/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const GradeSearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  error,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <GradeCheckboxGroup {...field} error={error} />}
    />
  );
};
