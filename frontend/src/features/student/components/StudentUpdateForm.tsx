import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { EmailInput } from '@/components/form';
import { StudentNameInput } from '@/features/student/components';
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateValidation),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <StudentNameInput
        id="studnetName"
        label="学生名"
        error={errors.studentName?.message}
        required
        {...register('studentName')}
      />

      <Controller
        name="grade"
        control={control}
        render={({ field, fieldState }) => (
          <GradeRadioGroup
            label="学年"
            column={4}
            name={field.name}
            value={field.value !== undefined ? String(field.value) : undefined}
            onChange={(val) => field.onChange(Number(val))}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="minorCategoryId"
        control={control}
        render={({ field, fieldState }) => (
          <MinorCategorySelect
            label="小分類名"
            required
            value={field.value as number | undefined}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <EmailInput
        id="mail"
        label="メールアドレス"
        helperText="メールアドレスは変更できません"
        disabled
        error={errors.email?.message}
        {...register('email')}
      />

      <Controller
        name="departmentId"
        control={control}
        render={({ field, fieldState }) => (
          <DepartmentSelect
            label="学科名"
            required
            value={field.value as number | undefined}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Input
        id="updatedAt"
        type="hidden"
        error={errors.updatedAt?.message}
        {...register('updatedAt')}
      />

      <div className="flex justify-center gap-4 mt-4">
        <Button type="submit" variant="Update" disabled={loading} className="w-32 py-2" />
        <Button type="button" variant="Back" onClick={onBack} className="w-32 py-2" />
      </div>
    </form>
  );
};
