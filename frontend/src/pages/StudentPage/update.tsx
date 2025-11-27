import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { gradeOptions } from '@/constants/grade';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { ROUTES } from '@/constants/routes';
import { useUpdate } from '@/hooks/useUpdate';
import { useView } from '@/hooks/useView';
import { validation } from '@shared/schemas/student';
import { StudentApi } from '@/api/studentApi';
import type { StudentForm } from '@shared/schemas/student';
import type { StudentDetail } from '@/interface/student';
import { Mail, User, BookUser, Library, Group } from 'lucide-react';

export const StudentUpdate = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { update, loading } = useUpdate<StudentForm>(StudentApi.update);
  const { view } = useView<StudentDetail>(StudentApi.view);

  const {
    register,
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
      const data: any = await view(studentId);
      reset({
        studentName: data.studentName,
        email: data.email,
        grade: data.grade,
        minorCategoryId: data.minorCategoryId,
        departmentId: data.departmentId,
      });
    };

    fetchStudent();
  }, [studentId, view, reset, navigate]);

  // 更新処理
  const onSubmit = async (data: any) => {
    if (!studentId) return;
    await update(studentId, data);
    navigate(ROUTES.STUDENT.INDEX);
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="studentName"
              label="学生名"
              type="text"
              error={errors.studentName?.message}
              leftIcon={<User className="size-4" />}
              required
              {...register('studentName')}
            />
            <Select
              id="grade"
              label="学年"
              options={gradeOptions}
              leftIcon={<BookUser className="size-4" />}
              required
              error={errors.grade?.message}
              {...register('grade')}
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
