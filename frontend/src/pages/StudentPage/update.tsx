import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/constants/minorCategoryOptions';
import { departmentOptions } from '@/constants/departmentOptions';
import { ROUTES } from '@/constants/routes';
import { useUpdate } from '@/hooks/useUpdate';
import { useView } from '@/hooks/useView';
import { validation } from '@shared/schemas/student';
import { StudentApi } from '@/api/studentApi';
import type { StudentForm } from '@shared/schemas/student';
import { handleApiError } from '@/utils/handleApiError';
import type { StudentDetail } from '@/interface/student';
import { Mail, User, Library, Group } from 'lucide-react';

export const StudentUpdate = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { update, loading } = useUpdate<StudentForm>(StudentApi.update);
  const { view } = useView<StudentDetail>(StudentApi.view);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 初期値をロード
  useEffect(() => {
    if (!studentId) return;
    const fetchStudent = async () => {
      try {
        const data: StudentDetail = await view(studentId);
        reset({
          studentName: data.studentName,
          email: data.email,
          grade: data.grade,
          minorCategoryId: data.minorCategoryId,
          departmentId: data.departmentId,
        });
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };
    fetchStudent();
  }, []);

  // 更新処理
  const onSubmit = async (data: StudentForm) => {
    try {
      if (!studentId) return;
      const res = await update(studentId, data);
      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生更新</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="studentName"
              label="学生名"
              type="text"
              error={errors.studentName?.message}
              leftIcon={<User className="size-4" />}
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
              leftIcon={<Group className="size-4" />}
              required
              error={errors.minorCategoryId?.message}
              {...register('minorCategoryId')}
            />
            <Input
              id="email"
              type="email"
              label="メールアドレス"
              helperText="メールアドレスは変更できません"
              leftIcon={<Mail className="size-4" />}
              disabled
              error={errors.email?.message}
              {...register('email')}
            />
            <Select
              id="department"
              label="学科名"
              options={departmentOptions}
              leftIcon={<Library className="size-4" />}
              required
              error={errors.departmentId?.message}
              {...register('departmentId')}
            />

            <div className="flex justify-center gap-4 mt-4">
              <Button type="submit" variant="Update" disabled={loading} className="w-32 mx-auto" />
              <Button
                type="button"
                variant="Back"
                onClick={() => navigate(ROUTES.STUDENT.INDEX)}
                className="w-32 mx-auto"
              />
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
};
