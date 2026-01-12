import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useHistoryDelete } from '@/features/history/hooks/useHistoryDelete';
import { useHistoryView } from '@/features/history/hooks/useHistoryView';

import type { StdentInfo } from '@shared/types/history';
import { HistoryDeleteView } from '@/features/history/components';
import type { HistoryUpdateForm } from '@shared/schemas/history';
import { HistoryBasicInfo } from '@/features/history/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/routes/routes';

export const HistoryDeletePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { deleteHistory, loading: deleting } = useHistoryDelete();
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }
  const { history, loading } = useHistoryView(historyId);
  if (loading || !history) {
    return <Loading loading={loading} />;
  }

  const handleSubmit = async () => {
    if (!history) {
      navigate(ROUTES.ERROR.NOTFOUND, { replace: true });
      return;
    }
    try {
      const res = await deleteHistory(history.historyId);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };
  //マッピング
  const historyBasic: StdentInfo = {
    studentName: history.studentName,
    grade: history.grade,
    minorCategoryId: history.minorCategoryId,
    departmentId: history.departmentId,
  };

  const historyDelete: HistoryUpdateForm = {
    statusId: history.statusId,
    startTime: history.startTime,
    endTime: history.endTime ?? '',
    other: history.other ?? '',
    updatedAt: history.updatedAt,
    validFlag: history.validFlag,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">履歴削除</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 左：基本情報（READ ONLY） */}
          <div className="space-y-6">
            <HistoryBasicInfo stdent={historyBasic} />
          </div>

          {/* 右：編集フォーム */}
          <div className="space-y-6">
            <HistoryDeleteView
              history={historyDelete}
              loading={deleting}
              onDelete={handleSubmit}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
