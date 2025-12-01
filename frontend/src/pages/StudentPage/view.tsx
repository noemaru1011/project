import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/constants/minorCategoryOptions';
import { departmentOptions } from '@/constants/departmentOptions';
import { useView } from '@/hooks/useView';
import { Loading } from '@/components/atoms/Loading';
import { ROUTES } from '@/constants/routes';
import type { StudentDetail } from '@/interface/student';
import { StudentApi } from '@/api/studentApi';
import { handleApiError } from '@/utils/handleApiError';

export const StudentView = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, loading } = useView<StudentDetail>(StudentApi.view);
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

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生参照</h2>
          <Input
            id="studentName"
            label="学生名"
            type="text"
            value={student ? student.studentName : ''}
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
            id="minorCategoryId"
            label="小分類名"
            options={minorCategoryOptions}
            value={student ? String(student.minorCategoryId) : ''}
            disabled
          />
          <Input
            id="email"
            label="メールアドレス"
            type="email"
            value={student ? student.email : ''}
            disabled
          />
          <Select
            id="departmentId"
            label="学科名"
            options={departmentOptions}
            value={student ? String(student.departmentId) : ''}
            disabled
          />

          <div className="flex justify-center gap-4 mt-4">
            <Button
              type="button"
              variant="Back"
              className="w-64 py-2"
              onClick={() => navigate(ROUTES.STUDENT.INDEX)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};
