import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { gradeOptions } from '@/constants/grade';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
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

  // 送信処理
  const onSubmit = async (data: any) => {
    await create(data);
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
              leftIcon={<User className="size-4" />}
              error={errors.studentName?.message}
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
              helperText="メールアドレスは重複しないように"
              leftIcon={<Mail className="size-4" />}
              required
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

            <Button type="submit" variant="Create" disabled={loading} className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};
