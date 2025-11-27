import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { gradeOptions } from '@/constants/grade';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { ROUTES } from '@/constants/routes';
import { useDelete } from '@/hooks/useDelete';
import { useView } from '@/hooks/useView';
import type { StudentDetail } from '@/interface/student';
import { StudentApi } from '@/api/studentApi';
import { Mail, User, BookUser, Library, Group } from 'lucide-react';

export const StudentDelete = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { remove, loading } = useDelete(StudentApi.delete);
  const { view } = useView<StudentDetail>(StudentApi.view);
  const [student, setStudent] = useState<StudentDetail | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetch = async () => {
      const data = await view(studentId);
      setStudent(data);
    };

    fetch();
  }, [studentId, view]);

  const handleDelete = async () => {
    if (!studentId) return;
    await remove(studentId);
    navigate(ROUTES.STUDENT.INDEX);
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <Input
            id="studentName"
            label="学生名"
            type="text"
            value={student?.studentName ?? ''}
            leftIcon={<User className="size-4" />}
            disabled
          />

          <Select
            id="grade"
            label="学年"
            options={gradeOptions}
            value={String(student?.grade ?? '')}
            leftIcon={<BookUser className="size-4" />}
            disabled
          />

          <Select
            id="minorCategory"
            label="小分類名"
            options={minorCategoryOptions}
            value={String(student?.minorCategoryId ?? '')}
            leftIcon={<Group className="size-4" />}
            disabled
          />

          <Input
            id="email"
            label="メールアドレス"
            type="email"
            value={student?.email ?? ''}
            leftIcon={<Mail className="size-4" />}
            disabled
          />

          <Select
            id="department"
            label="学科名"
            options={departmentOptions}
            value={String(student?.departmentId ?? '')}
            leftIcon={<Library className="size-4" />}
            disabled
          />

          <div className="flex justify-center gap-4 mt-4">
            <Button type="button" variant="Delete" className="w-32" onClick={handleDelete} />
            <Button
              type="button"
              variant="Back"
              className="w-32"
              onClick={() => navigate(ROUTES.STUDENT.INDEX)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};
