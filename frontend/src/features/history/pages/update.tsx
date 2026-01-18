import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useHistoryView } from '@/features/history/hooks/useHistoryView';
import { useHistoryUpdate } from '@/features/history/hooks/useHistoryUpdate';
import { HistoryUpdateForm } from '@/features/history/components';
import { HistoryBasicInfo } from '@/features/history/components';
import type { StudentBasicInfo, HistoryResponse, HistoryUpdateInput } from '@shared/models/history';
import { Loading } from '@/components/ui/Loading/Loading';
import { handleApiErrorWithUI } from '@/utils/handleApiError';
import { ROUTES } from '@/routes/routes';

export const HistoryUpdatePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { updateHistory, loading: updating } = useHistoryUpdate();
  const { viewHistory, loading } = useHistoryView();
  const [history, setHistory] = useState<HistoryResponse | null>(null);

  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await viewHistory(historyId);
        setHistory(res.data);
      } catch (err) {
        handleApiErrorWithUI(err, navigate);
      }
    };

    fetchStudent();
  }, [historyId, viewHistory, navigate]);

  if (loading || !history) {
    return <Loading loading={loading} />;
  }

  const defaultValues: HistoryUpdateInput = {
    statusId: history.statusId,
    other: history.other ?? '',
    startTime: history.startTime,
    endTime: history.endTime ?? '',
    validFlag: history.validFlag,
    updatedAt: history.updatedAt,
  };

  const historyBasic: StudentBasicInfo = {
    studentName: history.studentName,
    grade: history.grade,
    minorCategoryId: history.minorCategoryId,
    departmentId: history.departmentId,
  };

  const handleSubmit = async (data: HistoryUpdateInput) => {
    if (!history) {
      navigate(ROUTES.ERROR.NOTFOUND, { replace: true });
      return;
    }
    try {
      const res = await updateHistory(history.historyId, data);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">履歴更新</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 左：基本情報（READ ONLY） */}
          <div className="space-y-6">
            <HistoryBasicInfo stdent={historyBasic} />
          </div>

          {/* 右：編集フォーム */}
          <div className="space-y-6">
            <HistoryUpdateForm
              defaultValues={defaultValues}
              loading={updating}
              onSubmit={handleSubmit}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
