import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput, StudentEmailInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategory.Select';
import { DepartmentSelect } from '@/features/department/components/Department.Select';
import type { StudentDetail } from '@/features/student';

type Props = {
  student: StudentDetail;
  onDelete: () => void;
  onBack: () => void;
  loading: boolean;
};

export const StudentDeleteView = ({ student, onDelete, onBack, loading }: Props) => {
  return (
    <>
      <StudentNameInput value={student.studentName} disabled />

      <GradeRadioGroup name="grade" value={String(student.grade)} disabled />

      <MinorCategorySelect value={student.minorCategoryId} disabled />

      <StudentEmailInput value={student.email} disabled />

      <DepartmentSelect value={student.departmentId} disabled />

      <div className="flex justify-center gap-4 mt-4">
        <Button
          type="button"
          variant="Delete"
          disabled={loading}
          className="w-32 mx-auto py-2"
          onClick={onDelete}
        />
        <Button type="button" variant="Back" className="w-32 mx-auto py-2" onClick={onBack} />
      </div>
    </>
  );
};
