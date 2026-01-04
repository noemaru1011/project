import { StudentNameInput } from '@/features/student/components';
import { GradeSelect } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components';
import { DepartmentSelect } from '@/features/department/components';
import type { Stdent } from '@/features/history';

type Props = {
  stdent: Stdent;
};

export const HistoryBasicInfo = ({ stdent }: Props) => (
  <section
    className="
      relative
      rounded-2xl
      bg-white
      p-6
      shadow-sm
      ring-1 ring-gray-200
      transition
      hover:shadow-md
      hover:ring-gray-300
    "
  >
    {/* ヘッダー */}
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold tracking-wide text-gray-700">基本情報</h3>
      <span className="text-xs text-gray-400">READ ONLY</span>
    </div>

    {/* コンテンツ */}
    <div className="space-y-4">
      <StudentNameInput value={stdent.studentName} disabled />
      <GradeSelect value={String(stdent.grade)} disabled />
      <MinorCategorySelect value={String(stdent.minorCategoryId)} disabled />
      <DepartmentSelect value={String(stdent.departmentId)} disabled />
    </div>
  </section>
);
