import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput } from '@/features/student/components';
import { EmailInput } from '@/components/form';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategorySelect';
import { DepartmentSelect } from '@/features/department/components/DepartmentSelect';
import type { StudentDetail } from '@/features/student';

type Props = {
  student: StudentDetail;
  onDelete: () => void;
  onBack: () => void;
};

export const StudentDeleteView = ({ student, onDelete, onBack }: Props) => {
  return (
    <>
      <StudentNameInput id="studnetName" label="学生名" value={student.studentName} disabled />

      <GradeRadioGroup
        name="grade"
        column={4}
        label="学年"
        value={String(student.grade)}
        disabled
      />

      <MinorCategorySelect label="小分類名" value={String(student.minorCategoryId)} disabled />

      <EmailInput id="mail" label="メールアドレス" value={student.email} disabled />

      <DepartmentSelect label="学科名" value={String(student.departmentId)} disabled />

      <div className="flex justify-center gap-4 mt-4">
        <Button type="button" variant="Delete" className="w-32 mx-auto py-2" onClick={onDelete} />
        <Button type="button" variant="Back" className="w-32 mx-auto py-2" onClick={onBack} />
      </div>
    </>
  );
};
