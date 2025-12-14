import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';
import { ROUTES } from '@/constants/routes';
import { useDelete } from '@/hooks/useDelete';
import { useView } from '@/hooks/useView';
import type { HistoryResult } from '@/interface/history';
import { HistoryApi } from '@/api/historyApi';
import { handleApiError } from '@/utils/handleApiError';
import { Calendar, FileText, AlertCircle } from 'lucide-react';

export const HistoryDelete = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { remove, loading } = useDelete(HistoryApi.delete);
  const { view } = useView<HistoryResult>(HistoryApi.view);
  const [history, setHistory] = useState<HistoryResult | null>(null);

  useEffect(() => {
    if (!historyId) return;
    const fetch = async () => {
      try {
        const data = await view(historyId);
        setHistory(data);
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };
    fetch();
  }, [historyId, view, navigate]);

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

  // statusNameからstatusIdを取得
  const statusOption = history
    ? statusOptions.find((opt) => opt.label === history.statusName)
    : undefined;
  const statusValue = statusOption ? statusOption.value : undefined;

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">履歴削除</h2>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="size-5" />
              <span className="font-semibold">この操作は取り消せません</span>
            </div>
          </div>

          <Input
            id="studentName"
            label="学生名"
            type="text"
            value={history?.studentName ?? ''}
            disabled
          />

          <RadioGroup
            name="statusId"
            label="状況"
            options={statusOptions}
            value={statusValue}
            disabled
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              id="startTime"
              type="datetime-local"
              label="有効開始日"
              value={
                history?.startTime
                  ? new Date(history.startTime).toISOString().slice(0, 16)
                  : ''
              }
              disabled
              leftIcon={<Calendar className="size-4" />}
            />
            <Input
              id="endTime"
              type="datetime-local"
              label="有効終了日"
              value={
                history?.endTime
                  ? new Date(history.endTime).toISOString().slice(0, 16)
                  : ''
              }
              disabled
              leftIcon={<Calendar className="size-4" />}
            />
          </div>

          <Textarea
            id="other"
            label="備考欄"
            value={history?.other ?? ''}
            disabled
          />

          <div className="flex justify-center gap-4 mt-4">
            <Button
              type="button"
              variant="Delete"
              className="w-32 mx-auto py-2"
              onClick={handleDelete}
            />
            <Button
              type="button"
              variant="Back"
              className="w-32 mx-auto py-2"
              onClick={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

