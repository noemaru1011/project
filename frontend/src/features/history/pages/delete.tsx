import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useHistoryDelete } from '../hooks/useHistoryDelete';
import { useHistoryView } from '../hooks/useHistoryView';

import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { Button } from '@/components/ui/Button/Button';
import { StudentNameInput } from '@/features/student/components';
import { GradeSelect } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components';
import { DepartmentSelect } from '@/features/department/components';
import { StatusRadioGroup } from '@/features/status/components';
import { StartTimeInput, EndTimeInput, OtherTextarea } from '@/features/history/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/constants/routes';

export const HistoryDeletePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { history, loading } = useHistoryView(historyId);
  const { deleteHistory, loading: deleting } = useHistoryDelete();

  const handleDelete = async () => {
    if (!history) return;
    const res = await deleteHistory(history.historyId);
    toast.success(res!.message);
    navigate(ROUTES.HISTORY.INDEX);
  };

  return (
    <Loading loading={deleting || loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl  p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">履歴削除</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ===== 左：変更不可 ===== */}
            <section className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700">基本情報（変更不可）</h3>

              <StudentNameInput label="学生名" value={history?.studentName ?? ''} disabled />

              <GradeSelect
                label="学年"
                value={history?.grade !== undefined ? String(history.grade) : undefined}
                disabled
              />

              <MinorCategorySelect
                label="小分類名"
                value={String(history?.minorCategoryId ?? '')}
                disabled
              />

              <DepartmentSelect
                label="学科名"
                value={String(history?.departmentId ?? '')}
                disabled
              />
            </section>

            {/* ===== 右：編集可能 ===== */}
            <section className="space-y-6 p-4 bg-white rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700">
                削除内容(データベースから削除されます。)
              </h3>

              <StatusRadioGroup
                name="statusId"
                label="状況"
                value={history?.statusId !== undefined ? String(history.statusId) : undefined}
                disabled
              />

              <div className="flex flex-col gap-4">
                <StartTimeInput value={history?.startTime} label="有効開始日" disabled />
                <EndTimeInput value={history?.endTime ?? undefined} label="有効終了日" disabled />
              </div>

              <OtherTextarea label="備考欄" value={history?.other} disabled />

              <Checkbox id="validFlag" label="有効フラグ" checked={!!history?.validFlag} disabled />
            </section>
          </div>

          {/* ===== ボタン ===== */}
          <div className="flex justify-center gap-4 mt-6">
            <Button type="submit" variant="Delete" onClick={handleDelete} className="w-32" />
            <Button
              type="button"
              variant="Back"
              onClick={() => navigate(ROUTES.HISTORY.INDEX)}
              className="w-32"
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};
