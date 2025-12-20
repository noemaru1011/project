import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDelete } from '@/hooks/useDelete';
import { useView } from '@/hooks/useView';
import { User, Library, Group } from 'lucide-react';

import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Checkbox } from '@/components/atoms/Checkbox';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/features/minorCategory/constants/options';
import { departmentOptions } from '@/constants/departmentOptions';

import { HistoryApi } from '@/api/historyApi';

import type { HistoryDetail } from '@/interface/history';

import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/constants/routes';

export const HistoryDelete = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { remove, loading } = useDelete(HistoryApi.delete);
  const { view } = useView<HistoryDetail>(HistoryApi.view);

  const [history, setHistoryData] = useState<HistoryDetail | null>(null);

  // 初期値ロード
  useEffect(() => {
    if (!historyId) return;

    const fetch = async () => {
      if (!historyId) return;
      try {
        const data: HistoryDetail = await view(historyId);
        setHistoryData(data);
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      if (!historyId) return;
      const res = await remove(historyId);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl  p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">履歴削除</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ===== 左：変更不可 ===== */}
            <section className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700">基本情報（変更不可）</h3>

              <Input
                id="studentName"
                label="学生名"
                type="text"
                value={history?.studentName ?? ''}
                leftIcon={<User className="size-4" />}
                disabled
              />

              <RadioGroup
                name="grade"
                label="学年"
                options={gradeOptions}
                value={history?.grade !== undefined ? String(history.grade) : undefined}
                disabled
              />

              <Select
                id="minorCategory"
                label="小分類名"
                options={minorCategoryOptions}
                value={String(history?.minorCategoryId ?? '')}
                leftIcon={<Group className="size-4" />}
                disabled
              />

              <Select
                id="department"
                label="学科名"
                options={departmentOptions}
                value={String(history?.departmentId ?? '')}
                leftIcon={<Library className="size-4" />}
                disabled
              />
            </section>

            {/* ===== 右：編集可能 ===== */}
            <section className="space-y-6 p-4 bg-white rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700">
                削除内容(データベースから削除されます。)
              </h3>

              <RadioGroup
                name="statusId"
                label="状況"
                options={statusOptions}
                value={history?.statusId !== undefined ? String(history.statusId) : undefined}
                disabled
              />

              <div className="flex flex-col gap-4">
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={history?.startTime}
                  label="有効開始日"
                  disabled
                />
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={history?.endTime ?? undefined}
                  label="有効終了日"
                  disabled
                />
              </div>

              <Textarea id="other" label="備考欄" value={history?.other} disabled />

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
