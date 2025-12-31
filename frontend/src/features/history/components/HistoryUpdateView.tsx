import { HistoryBasicInfo, HistoryUpdateForm } from '@/features/history/components';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/Button/Button';
import type { HistoryUpdateForm as HistoryUpdateFormType } from '@shared/schemas/history';
import type { HistoryBasic } from '@/features/history';
import { Loading } from '@/components/ui/Loading/Loading';

type Props = {
  historyBasic: HistoryBasic | null;
  historyUpdate: UseFormReturn<HistoryUpdateFormType>;
  onUpdate: () => void;
  onBack: () => void;
};
export const HistoryUpdateView = ({ historyBasic, historyUpdate, onUpdate, onBack }: Props) => {
  if (!historyBasic || !historyUpdate) return <Loading loading />;

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 p-10">
      <div className="w-full max-w-4xl space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold">履歴更新</h2>

        <form
          onSubmit={historyUpdate.handleSubmit(onUpdate)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <HistoryBasicInfo type={historyBasic} />
          <HistoryUpdateForm type={historyUpdate} />
          <div className="col-span-full flex justify-center gap-4 pt-4">
            <Button type="submit" variant="Update" />
            <Button type="button" variant="Back" onClick={onBack} />
          </div>
        </form>
      </div>
    </div>
  );
};
