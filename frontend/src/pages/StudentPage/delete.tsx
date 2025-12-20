import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/features/minorCategory/constants/options';
import { departmentOptions } from '@/features/department/constants/options';
import { ROUTES } from '@/constants/routes';
import { useDelete } from '@/hooks/useDelete';
import { useView } from '@/hooks/useView';
import type { StudentDetail } from '@/interface/student';
import { StudentApi } from '@/api/studentApi';
import { handleApiError } from '@/utils/handleApiError';
import { Mail, User, Library, Group } from 'lucide-react';

export const StudentDelete = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { remove, loading } = useDelete(StudentApi.delete);
  const { view } = useView<StudentDetail>(StudentApi.view);
  const [student, setStudent] = useState<StudentDetail | null>(null);

  useEffect(() => {
    if (!studentId) return;
    const fetch = async () => {
      try {
        const data = await view(studentId);
        setStudent(data);
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      if (!studentId) return;
      const res = await remove(studentId);
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
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生削除</h2>
          <Input
            id="studentName"
            label="学生名"
            type="text"
            value={student?.studentName ?? ''}
            leftIcon={<User className="size-4" />}
            disabled
          />

          <RadioGroup
            name="grade"
            label="学年"
            options={gradeOptions}
            value={student?.grade !== undefined ? String(student.grade) : undefined}
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
            <Button
              type="button"
              variant="Delete"
              className="w-32 mx-auto py-2"
              onClick={handleDelete}
            />
            <Button
              type="button"
              variant="Back"
              className="w-32 mx-auto py-2"
              onClick={() => navigate(ROUTES.STUDENT.INDEX)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};
