import { StudentNameInput, StudentEmailInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategory.Select';
import { DepartmentSelect } from '@/features/department/components/Department.Select';
import { Button } from '@/components/ui/Button/Button';
import type { StudentResponse } from '@shared/models/student';

type Props = {
  student: StudentResponse;
  onBack: () => void;
};

export const StudentView = ({ student, onBack }: Props) => {
  return (
    <section className="space-y-6">
      <StudentNameInput value={student.studentName} disabled />

      <GradeRadioGroup name="grade" value={student.grade} disabled />

      <MinorCategorySelect value={student.minorCategoryId} disabled />

      <StudentEmailInput value={student.email} disabled />

      <DepartmentSelect value={student.departmentId} disabled />

      <div className="flex justify-center mt-4">
        <Button type="button" variant="Back" className="w-64 py-2" onClick={onBack} />
      </div>
    </section>
  );
};
