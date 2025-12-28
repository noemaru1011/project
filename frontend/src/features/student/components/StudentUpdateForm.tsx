import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput, StudentEmailInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategorySelect';
import { DepartmentSelect } from '@/features/department/components/DepartmentSelect';
import { updateValidation } from '@shared/schemas/student';
import type { StudentUpdateForm as StudentUpdateFormType } from '@shared/schemas/student';

type Props = {
  defaultValues: StudentUpdateFormType;
  loading: boolean;
  onSubmit: (data: StudentUpdateFormType) => void;
  onBack: () => void;
};

export const StudentUpdateForm = ({ defaultValues, loading, onSubmit, onBack }: Props) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <StudentNameInput error={errors.studentName?.message} {...register('studentName')} />

      <Controller
        name="grade"
        control={control}
        render={({ field, fieldState }) => (
          <GradeRadioGroup
            name={field.name}
            value={field.value !== undefined ? String(field.value) : undefined}
            onChange={(val) => field.onChange(Number(val))}
            error={fieldState.error?.message}
          />
        )}
      />

      <MinorCategorySelect
        error={errors.minorCategoryId?.message}
        {...register('minorCategoryId')}
      />

      <StudentEmailInput
        helperText="メールアドレスは変更できません"
        {...register('email')}
        disabled
      />

      <DepartmentSelect error={errors.departmentId?.message} {...register('departmentId')} />

      <Input type="hidden" error={errors.updatedAt?.message} {...register('updatedAt')} />

      <div className="flex justify-center gap-4 mt-4">
        <Button type="submit" variant="Update" disabled={loading} className="w-32 py-2" />
        <Button type="button" variant="Back" onClick={onBack} className="w-32 py-2" />
      </div>
    </form>
  );
};
