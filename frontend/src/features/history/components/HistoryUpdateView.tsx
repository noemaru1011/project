import { HistoryBasicInfo, HistoryUpdateForm } from '@/features/history/components';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/Button/Button';
import type { HistoryUpdateForm as HistoryUpdateFormType } from '@shared/schemas/history';
import type { HistoryBasic } from '@/features/history';

type Props = {
  historyBasic: HistoryBasic;
  historyUpdate: UseFormReturn<HistoryUpdateFormType>;
  onUpdate: () => void;
  onBack: () => void;
  loading: boolean;
};
export const HistoryUpdateView = ({
  historyBasic,
  historyUpdate,
  onUpdate,
  onBack,
  loading,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HistoryBasicInfo type={historyBasic} />
        <HistoryUpdateForm type={historyUpdate} />
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          type="submit"
          variant="Update"
          disabled={loading}
          onClick={onUpdate}
          className="w-32"
        />
        <Button type="button" variant="Back" onClick={onBack} className="w-32" />
      </div>
    </>
  );
};
