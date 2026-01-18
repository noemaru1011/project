import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // アイコンライブラリ（任意）

type Props = {
  students: { id: string; name: string }[];
};

export const SelectedStudentsFloat = ({ students }: Props) => {
  const [isOpen, setIsOpen] = useState(true); // 初期状態を開くか閉じるか

  if (students.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl border rounded-lg overflow-hidden text-sm max-w-xs animate-slide-up">
      {/* ヘッダー部分：クリックで開閉 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span>選択中の学生（{students.length}）</span>
        {/* 状態に合わせて矢印の向きを変える */}
        {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </button>

      {/* リスト部分：isOpenがtrueのときだけ表示 */}
      {isOpen && (
        <div className="px-4 pb-4 border-t">
          <ul className="mt-2 space-y-1 text-gray-600 max-h-48 overflow-y-auto">
            {students.map((s) => (
              <li key={s.id} className="truncate">
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
