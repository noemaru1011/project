import { StudentNameInput } from '@/features/student/components';
import { EmailInput } from '@/components/form';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategorySelect';
import { DepartmentSelect } from '@/features/department/components/DepartmentSelect';
import { Button } from '@/components/ui/Button/Button';
import type { StudentDetail } from '@/features/student/types';

type Props = {
  student: StudentDetail | null;
  onBack: () => void;
};

export const StudentView = ({ student, onBack }: Props) => {
  return (
    <>
      <StudentNameInput
        id="studentName"
        label="学生名"
        value={student?.studentName ?? ''}
        disabled
      />

      <GradeRadioGroup
        name="grade"
        column={4}
        label="学年"
        value={student?.grade !== undefined ? String(student.grade) : undefined}
        disabled
      />

      <MinorCategorySelect
        label="小分類名"
        value={student ? String(student.minorCategoryId) : ''}
        disabled
      />

      <EmailInput id="mail" label="メールアドレス" value={student?.email ?? ''} disabled />

      <DepartmentSelect
        label="学科名"
        value={student ? String(student.departmentId) : ''}
        disabled
      />

      <div className="flex justify-center mt-4">
        <Button type="button" variant="Back" className="w-64 py-2" onClick={onBack} />
      </div>
    </>
  );
};
