import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/Input/Input';
import { StatusRadioGroup } from '@/features/status/components';
import {
  StartTimeInput,
  EndTimeInput,
  OtherTextarea,
  VailFlagCheckbox,
} from '@/features/history/components';

import type { HistoryUpdateForm as HistoryUpdateFormType } from '@shared/schemas/history';

export const HistoryUpdateForm = ({ type }: { type: UseFormReturn<HistoryUpdateFormType> }) => {
  const { control, register, formState } = type;

  return (
    <section className="space-y-6 rounded-xl bg-white p-4">
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

      <StartTimeInput {...register('startTime')} error={formState.errors.startTime?.message} />
      <EndTimeInput {...register('endTime')} error={formState.errors.endTime?.message} />
      <OtherTextarea {...register('other')} error={formState.errors.other?.message} />
      <VailFlagCheckbox {...register('validFlag')} />
      <Input type="hidden" {...register('updatedAt')} />
    </section>
  );
};
