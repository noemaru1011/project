import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { SubCategoryCheckboxGroup } from '@/features/subCategory/components';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const SubCategorySearchAccordionItem = <T extends FieldValues>({
  control,
  name,
  error,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <SubCategoryCheckboxGroup {...field} error={error} />}
    />
  );
};
