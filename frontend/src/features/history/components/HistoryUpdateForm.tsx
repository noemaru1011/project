import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input/Input';
import { StatusRadioGroup } from '@/features/status/components';
import {
  StartTimeInput,
  EndTimeInput,
  OtherTextarea,
  VailFlagCheckbox,
} from '@/features/history/components';
import { Button } from '@/components/ui/Button/Button';
import type { HistoryUpdateForm as HistoryUpdateFormType } from '@shared/schemas/history';
import { updateValidation } from '@shared/schemas/history';

type Props = {
  defaultValues: HistoryUpdateFormType;
  onSubmit: (data: HistoryUpdateFormType) => void;
  loading: boolean;
  onBack: () => void;
};

export const HistoryUpdateForm = ({ defaultValues, onSubmit, loading, onBack }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateValidation),
    defaultValues,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-xl bg-white p-4"
    >
      <Controller
        name="statusId"
        control={control}
        render={({ field, fieldState }) => (
          <StatusRadioGroup
            name={field.name}
            value={field.value !== undefined ? field.value : undefined}
            onChange={(val) => field.onChange(val)}
            error={fieldState.error?.message}
          />
        )}
      />
      <StartTimeInput {...register('startTime')} error={errors.startTime?.message} />
      <EndTimeInput {...register('endTime')} error={errors.endTime?.message} />
      <OtherTextarea {...register('other')} error={errors.other?.message} />
      <VailFlagCheckbox {...register('validFlag')} error={errors.validFlag?.message} />
      <Input type="hidden" {...register('updatedAt')} error={errors.updatedAt?.message} />

      <div className="flex justify-center gap-4 mt-6">
        <Button type="submit" variant="Update" disabled={loading} className="w-32" />
        <Button type="button" variant="Back" onClick={onBack} className="w-32" />
      </div>
    </form>
  );
};
