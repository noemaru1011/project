import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { StatusRadioGroup } from '@/features/status/components';
import { StartTimeInput, EndTimeInput, OtherTextarea } from '@/features/history/components';
import type { HistoryUpdateForm } from '@shared/schemas/history';

export const HistoryDeleteForm = ({ type }: { type: HistoryUpdateForm }) => (
  <section className="space-y-6 p-4 bg-white rounded-xl">
    <h3 className="text-lg font-semibold text-gray-700">
      削除内容（データベースから削除されます）
    </h3>

    <StatusRadioGroup name="statusId" value={String(type.statusId)} disabled />

    <div className="flex flex-col gap-4">
      <StartTimeInput value={type.startTime} disabled />
      <EndTimeInput value={type.endTime ?? undefined} disabled />
    </div>

    <OtherTextarea value={type.other} disabled />
    <Checkbox checked={!!type.validFlag} disabled />
  </section>
);
