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
};

export const HistoryCreateForm = ({ selectedStudents, onSubmit }: Props) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="statusId"
        control={control}
        render={({ field, fieldState }) => (
          <StatusRadioGroup
            label="状況"
            name={field.name}
            value={field.value !== undefined ? String(field.value) : undefined}
            onChange={(val) => field.onChange(Number(val))}
            required
            error={fieldState.error?.message}
          />
        )}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <StartTimeInput
            label="有効開始日"
            required
            error={errors.startTime?.message}
            {...register('startTime')}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <EndTimeInput
            label="有効終了日"
            error={errors.endTime?.message}
            {...register('endTime')}
          />
        </div>
      </div>

      <OtherTextarea label="備考欄" error={errors.other?.message} {...register('other')} />

      {isSubmitted && errors.studentIds && (
        <p className="text-red-500 text-sm text-center mt-4">{errors.studentIds.message}</p>
      )}
      <div className="flex justify-center gap-4">
        <Button variant="Create" type="submit" className="w-64 mx-auto py-2" />
      </div>
    </form>
  );
};
