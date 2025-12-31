import { HistoryBasicInfo, HistoryDeleteInfo } from '@/features/history/components';
import { Button } from '@/components/ui/Button/Button';
import type { HistoryUpdateForm } from '@shared/schemas/history';
import type { HistoryBasic } from '@/features/history';
import { Loading } from '@/components/ui/Loading/Loading';

type Props = {
  historyDelete: HistoryUpdateForm | null;
  historyBasic: HistoryBasic | null;
  onDelete: () => void;
  onBack: () => void;
};

export const HistoryDeleteView = ({ historyDelete, historyBasic, onDelete, onBack }: Props) => {
  if (!history || !historyBasic || !historyDelete) return <Loading loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">履歴削除</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HistoryBasicInfo type={historyBasic} />
          <HistoryDeleteInfo type={historyDelete} />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button type="submit" variant="Delete" onClick={onDelete} className="w-32" />
          <Button type="button" variant="Back" onClick={onBack} className="w-32" />
        </div>
      </div>
    </div>
  );
};
