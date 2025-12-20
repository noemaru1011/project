import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/features/minorCategory/constants/options';
import { departmentOptions } from '@/features/department/constants/options';
import { validation } from '@shared/schemas/student';
import type { StudentForm } from '@shared/schemas/student';
import { Mail, User, Library, Group } from 'lucide-react';

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
      <Input
        id="studentName"
        label="学生名"
        type="text"
        leftIcon={<User className="size-5 text-indigo-500" />}
        error={errors.studentName?.message}
        required
        {...register('studentName')}
      />

      <Controller
        name="grade"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            label="学年"
            name={field.name}
            options={gradeOptions}
            value={field.value !== undefined ? String(field.value) : undefined}
            onChange={(val) => field.onChange(Number(val))}
            error={fieldState.error?.message}
          />
        )}
      />

      <Select
        id="minorCategory"
        label="小分類名"
        options={minorCategoryOptions}
        leftIcon={<Group className="size-5 text-indigo-500" />}
        required
        error={errors.minorCategoryId?.message}
        {...register('minorCategoryId')}
      />

      <Input
        id="email"
        type="email"
        label="メールアドレス"
        helperText="メールアドレスは重複しないように"
        leftIcon={<Mail className="size-5 text-indigo-500" />}
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <Select
        id="department"
        label="学科名"
        options={departmentOptions}
        leftIcon={<Library className="size-5 text-indigo-500" />}
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
