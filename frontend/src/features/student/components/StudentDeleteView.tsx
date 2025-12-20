import { Input } from '@/components/atoms/Input';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/features/minorCategory/constants/options';
import { departmentOptions } from '@/features/department/constants/options';
import type { StudentDetail } from '@/features/student';
import { Mail, User, Library, Group } from 'lucide-react';

type Props = {
  student: StudentDetail;
  onDelete: () => void;
  onBack: () => void;
};

export const StudentDeleteView = ({ student, onDelete, onBack }: Props) => {
  return (
    <>
      <Input
        id="studentName"
        label="学生名"
        type="text"
        value={student.studentName}
        leftIcon={<User className="size-4" />}
        disabled
      />

      <RadioGroup
        name="grade"
        label="学年"
        options={gradeOptions}
        value={String(student.grade)}
        disabled
      />

      <Select
        id="minorCategory"
        label="小分類名"
        options={minorCategoryOptions}
        value={String(student.minorCategoryId)}
        leftIcon={<Group className="size-4" />}
        disabled
      />

      <Input
        id="email"
        label="メールアドレス"
        type="email"
        value={student.email}
        leftIcon={<Mail className="size-4" />}
        disabled
      />

      <Select
        id="department"
        label="学科名"
        options={departmentOptions}
        value={String(student.departmentId)}
        leftIcon={<Library className="size-4" />}
        disabled
      />

      <div className="flex justify-center gap-4 mt-4">
        <Button type="button" variant="Delete" className="w-32 mx-auto py-2" onClick={onDelete} />
        <Button type="button" variant="Back" className="w-32 mx-auto py-2" onClick={onBack} />
      </div>
    </>
  );
};
