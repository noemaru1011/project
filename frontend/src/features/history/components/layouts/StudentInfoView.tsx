import { Input } from '@/components/ui/Input/Input';
import type { StudentBasicInfo } from '@shared/models/history';

type Props = {
  stdent: StudentBasicInfo;
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
      <Input label="学生名" value={stdent.studentName} disabled />
      <Input label="学年" value={stdent.grade} disabled />
      <Input label="小分類名" value={stdent.minorCategoryName} disabled />
      <Input label="学科名" value={stdent.departmentName} disabled />
    </div>
  </section>
);
