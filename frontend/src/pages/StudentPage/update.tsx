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
import { useCrud } from '@/hooks/useCrud';
import { validation } from '@shared/schemas/student';
import { StudentApi } from '@/api/studentApi';
import type { DisplayStudent } from '@/types/displayStudent';
import { Mail, User, BookUser, Library, Group } from 'lucide-react';

export const StudentUpdate = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, update, loading } = useCrud<DisplayStudent>(StudentApi);

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
      try {
        const data: any = await view(studentId);
        reset({
          studentName: data.studentName,
          email: data.email,
          grade: data.grade,
          minorCategoryId: data.minorCategoryId,
          departmentId: data.departmentId,
        });
      } catch (err: any) {}
    };

    fetchStudent();
  }, [studentId, view, reset, navigate]);

  // 更新処理
  const onSubmit = async (data: any) => {
    try {
      if (!studentId) return;
      await update(studentId, data);
      navigate(ROUTES.STUDENT.INDEX);
    } catch (err: any) {}
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
            <Button type="submit" variant="Update" disabled={loading} className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};
