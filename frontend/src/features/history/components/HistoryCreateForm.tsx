import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/Button/Button';
import { StatusRadioGroup } from '@/features/status/components';
import { validation } from '@shared/schemas/history';
import type { HistoryForm } from '@shared/schemas/history';
import { EndTimeInput, StartTimeInput, OtherTextarea } from '@/features/history/components';

type Props = {
  onSubmit: (data: HistoryForm) => void;
  selectedStudents: { id: string; name: string }[];
  loading: boolean;
};

export const HistoryCreateForm = ({ selectedStudents, onSubmit, loading }: Props) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(validation),
    defaultValues: { studentIds: [] },
  });

  useEffect(() => {
    setValue(
      'studentIds',
      selectedStudents.map((s) => s.id),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }, [selectedStudents, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Controller
        name="statusId"
        control={control}
        render={({ field, fieldState }) => (
          <StatusRadioGroup
            name={field.name}
            value={field.value !== undefined ? String(field.value) : undefined}
            onChange={(val) => field.onChange(val)}
            error={fieldState.error?.message}
          />
        )}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <StartTimeInput error={errors.startTime?.message} {...register('startTime')} />
        </div>

        <div className="w-full sm:w-1/2">
          <EndTimeInput error={errors.endTime?.message} {...register('endTime')} />
        </div>
      </div>

      <OtherTextarea error={errors.other?.message} {...register('other')} />

      {isSubmitted && errors.studentIds && (
        <p className="text-red-500 text-sm text-center mt-4">{errors.studentIds.message}</p>
      )}
      <div className="flex justify-center gap-4">
        <Button variant="Create" type="submit" disabled={loading} className="w-64 mx-auto py-2" />
      </div>
    </form>
  );
};
