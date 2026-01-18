import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput, StudentEmailInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategory.Select';
import { DepartmentSelect } from '@/features/department/components/Department.Select';
import { StudentUpdateSchema } from '@shared/models/student';
import type { StudentUpdateInput } from '@shared/models/student';

type Props = {
  defaultValues: StudentUpdateInput;
  loading: boolean;
  onSubmit: (data: StudentUpdateInput) => void;
  onBack: () => void;
};

export const StudentUpdateForm = ({ defaultValues, loading, onSubmit, onBack }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StudentUpdateInput>({
    resolver: zodResolver(StudentUpdateSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <StudentNameInput error={errors.studentName?.message} {...register('studentName')} />

      <Controller
        name="grade"
        control={control}
        render={({ field, fieldState }) => (
          <GradeRadioGroup
            name={field.name}
            value={field.value}
            onChange={(val) => field.onChange(val)}
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
        <Button
          type="submit"
          variant="Primary"
          label="更新"
          disabled={loading}
          className="w-32 py-2"
        />
        <Button
          type="button"
          variant="Neutral"
          label="一覧へ戻る"
          onClick={onBack}
          className="w-32 py-2"
        />
      </div>
    </form>
  );
};
