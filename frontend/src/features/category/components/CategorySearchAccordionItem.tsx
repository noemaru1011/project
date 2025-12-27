import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { CategoryCheckboxGroup } from '@/features/category/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const CategorySearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  error,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <CategoryCheckboxGroup {...field} error={error} />}
    />
  );
};
