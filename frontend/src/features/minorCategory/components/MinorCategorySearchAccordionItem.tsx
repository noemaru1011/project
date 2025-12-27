import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { MinorCategoryCheckboxGroup } from '@/features/minorCategory/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const MinorCategorySearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  error,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <MinorCategoryCheckboxGroup {...field} error={error} />}
    />
  );
};
