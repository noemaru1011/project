import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { DepartmentCheckboxGroup } from '@/features/department/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const DepartmentSearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  error,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <DepartmentCheckboxGroup {...field} error={error} />}
    />
  );
};
