import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { Button } from '@/components/ui/Button/Button';
import { StatusRadioGroup } from '@/features/status/components';
import { StartTimeInput, EndTimeInput, OtherTextarea } from '@/features/history/components';
import type { HistoryUpdateInput } from '@shared/models/history';

type Props = {
  history: HistoryUpdateInput;
  onDelete: () => void;
  onBack: () => void;
  loading: boolean;
};

export const HistoryDeleteView = ({ history, onDelete, onBack, loading }: Props) => (
  <section className="space-y-6 p-4 bg-white rounded-xl">
    <h3 className="text-lg font-semibold text-gray-700">
      削除内容（データベースから削除されます）
    </h3>

    <StatusRadioGroup name="statusId" value={String(history.statusId)} disabled />

    <div className="flex flex-col gap-4">
      <StartTimeInput value={history.startTime} disabled />
      <EndTimeInput value={history.endTime ?? undefined} disabled />
    </div>

    <OtherTextarea value={history.other} disabled />
    <Checkbox checked={!!history.validFlag} disabled />

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
