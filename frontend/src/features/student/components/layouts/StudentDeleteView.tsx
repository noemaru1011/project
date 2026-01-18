import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput, StudentEmailInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components/MinorCategory.Select';
import { DepartmentSelect } from '@/features/department/components/Department.Select';
import type { StudentResponse } from '@shared/models/student';

type Props = {
  student: StudentResponse;
  onDelete: () => void;
  onBack: () => void;
  loading: boolean;
};

export const StudentDeleteView = ({ student, onDelete, onBack, loading }: Props) => {
  return (
    <section className="space-y-6">
      <StudentNameInput value={student.studentName} disabled />

      <GradeRadioGroup name="grade" value={student.grade} disabled />

      <MinorCategorySelect value={student.minorCategoryId} disabled />

      <StudentEmailInput value={student.email} disabled />

      <DepartmentSelect value={student.departmentId} disabled />

      <div className="flex justify-center gap-4 mt-4">
        <Button
          type="button"
          variant="Danger"
          label="削除"
          disabled={loading}
          className="w-32 mx-auto py-2"
          onClick={onDelete}
        />
        <Button
          type="button"
          variant="Neutral"
          label="一覧へ戻る"
          className="w-32 mx-auto py-2"
          onClick={onBack}
        />
      </div>
    </section>
  );
};
