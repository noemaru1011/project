import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { DisplayStudent } from '@/types/displayStudent';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { gradeOptions } from '@/constants/grade';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { useCrud } from '@/hooks/useCrud';
import { Loading } from '@/components/atoms/Loading';
import { ROUTES } from '@/constants/routes';
import { StudentApi } from '@/api/studentApi';
import { Mail, User, BookUser, Library, Group } from 'lucide-react';

export const StudentView = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, loading } = useCrud<DisplayStudent>(StudentApi);
  const [student, setStudent] = useState<DisplayStudent | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const data: any = await view(studentId);
        setStudent(data);
      } catch (err: any) {}
    };

    fetchStudent();
  }, [studentId, view, navigate]);

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <Input
            id="studentName"
            label="学生名"
            type="text"
            leftIcon={<User className="size-4" />}
            value={student ? student.studentName : ''}
            disabled
          />
          <Select
            id="grade"
            label="学年"
            options={gradeOptions}
            leftIcon={<BookUser className="size-4" />}
            value={student ? String(student.grade) : ''}
            disabled
          />
          <Select
            id="minorCategoryId"
            label="小分類名"
            options={minorCategoryOptions}
            leftIcon={<Group className="size-4" />}
            value={student ? String(student.minorCategoryId) : ''}
            disabled
          />
          <Input
            id="email"
            label="メールアドレス"
            type="email"
            leftIcon={<Mail className="size-4" />}
            value={student ? student.email : ''}
            disabled
          />
          <Select
            id="departmentId"
            label="学科名"
            options={departmentOptions}
            leftIcon={<Library className="size-4" />}
            value={student ? String(student.departmentId) : ''}
            disabled
          />

          <Button
            type="button"
            variant="Back"
            className="w-full mt-4"
            onClick={() => navigate(ROUTES.STUDENT.INDEX)}
          />
        </div>
      </div>
    </Loading>
  );
};
