import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { RadioGroup } from "@/components/molecules/RadioGroup";
import { Button } from "@/components/atoms/Button";
import { gradeOptions } from "@/constants/gradeOptions";
import { minorCategoryOptions } from "@/features/minorCategory/constants/options";
import { departmentOptions } from "@/features/department/constants/options";
import { updateValidation } from "@shared/schemas/student";
import type { StudentUpdateForm as StudentUpdateFormType } from "@shared/schemas/student";
import { Mail, User, Library, Group } from "lucide-react";

type Props = {
  defaultValues: StudentUpdateFormType;
  loading: boolean;
  onSubmit: (data: StudentUpdateFormType) => void;
  onBack: () => void;
};

export const StudentUpdateForm = ({
  defaultValues,
  loading,
  onSubmit,
  onBack,
}: Props) => {
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
      <Input
        id="studentName"
        label="学生名"
        type="text"
        leftIcon={<User className="size-4" />}
        error={errors.studentName?.message}
        required
        {...register("studentName")}
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
        leftIcon={<Group className="size-4" />}
        required
        error={errors.minorCategoryId?.message}
        {...register("minorCategoryId")}
      />

      <Input
        id="email"
        type="email"
        label="メールアドレス"
        helperText="メールアドレスは変更できません"
        leftIcon={<Mail className="size-4" />}
        disabled
        error={errors.email?.message}
        {...register("email")}
      />

      <Select
        id="department"
        label="学科名"
        options={departmentOptions}
        leftIcon={<Library className="size-4" />}
        required
        error={errors.departmentId?.message}
        {...register("departmentId")}
      />

      <Input
        id="updatedAt"
        type="hidden"
        error={errors.updatedAt?.message}
        {...register("updatedAt")}
      />

      <div className="flex justify-center gap-4 mt-4">
        <Button
          type="submit"
          variant="Update"
          disabled={loading}
          className="w-32 py-2"
        />
        <Button
          type="button"
          variant="Back"
          onClick={onBack}
          className="w-32 py-2"
        />
      </div>
    </form>
  );
};
