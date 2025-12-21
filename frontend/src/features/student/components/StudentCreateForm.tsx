import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput, StudentEmailInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategorySelect';
import { DepartmentSelect } from '@/features/department/components/DepartmentSelect';
import { validation } from '@shared/schemas/student';
import type { StudentForm } from '@shared/schemas/student';

type Props = {
  onSubmit: (data: StudentForm) => void;
  onBack: () => void;
  loading: boolean;
};

export const StudentCreateForm = ({ onSubmit, onBack, loading }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    //TODO　型を修正
  } = useForm({
    resolver: zodResolver(validation),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <StudentNameInput
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
            name={field.name}
            value={field.value !== undefined ? String(field.value) : undefined}
            onChange={(val) => field.onChange(Number(val))}
            error={fieldState.error?.message}
          />
        )}
      />

      <MinorCategorySelect
        label="小分類名"
        required
        error={errors.minorCategoryId?.message}
        {...register('minorCategoryId')}
      />

      <StudentEmailInput
        label="メールアドレス"
        helperText="メールアドレスは重複しないように"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <DepartmentSelect
        label="学科名"
        required
        error={errors.departmentId?.message}
        {...register('departmentId')}
      />

      <div className="flex justify-center gap-4 mt-6">
        <Button type="submit" variant="Create" disabled={loading} className="w-32 mx-auto py-2" />
        <Button type="button" variant="Back" onClick={onBack} className="w-32 mx-auto py-2" />
      </div>
    </form>
  );
};
