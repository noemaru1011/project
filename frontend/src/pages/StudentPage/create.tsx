import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/constants/minorCategoryOptions';
import { departmentOptions } from '@/constants/departmentOptions';
import { validation } from '@shared/schemas/student';
import { useCreate } from '@/hooks/useCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/atoms/Loading';
import { ROUTES } from '@/constants/routes';
import { StudentApi } from '@/api/studentApi';
import type { StudentForm } from '@shared/schemas/student';
import { Mail, User, BookUser, Library, Group } from 'lucide-react';

export const StudentCreate = () => {
  const navigate = useNavigate();
  const { create, loading } = useCreate<StudentForm>(StudentApi.create);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: any) => {
    await create(data);
    navigate(ROUTES.STUDENT.INDEX);
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生登録</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="studentName"
              label="学生名"
              type="text"
              leftIcon={<User className="size-5 text-indigo-500" />}
              error={errors.studentName?.message}
              required
              {...register('studentName')}
            />
            <Select
              id="grade"
              label="学年"
              options={gradeOptions}
              leftIcon={<BookUser className="size-5 text-indigo-500" />}
              required
              error={errors.grade?.message}
              {...register('grade')}
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
              <Button type="submit" variant="Create" disabled={loading} className="w-32 py-2" />
              <Button
                type="button"
                variant="Back"
                onClick={() => navigate(ROUTES.STUDENT.INDEX)}
                className="w-32 py-2"
              />
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
};
