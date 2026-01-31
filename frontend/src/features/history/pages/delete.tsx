import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { HistoryBasicInfo, HistoryDeleteView } from '@/features/history/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { useViewHistory } from '@/features/history/hooks/useViewHistory';
import { useDeleteHistory } from '@/features/history/hooks/useDeleteHistory';

export const HistoryDeletePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();

  const { historyBasic, defaultValues, loading } = useViewHistory(historyId);
  const { deleteHistory, loading: deleting } = useDeleteHistory();

  // ID ガード
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  // 取得中
  if (loading) {
    return <Loading loading />;
  }

  // データ不整合ガード
  if (!historyBasic || !defaultValues) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">履歴削除</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 左：基本情報 */}
          <div className="space-y-6">
            <HistoryBasicInfo stdent={historyBasic} />
          </div>

          {/* 右：削除確認 */}
          <div className="space-y-6">
            <HistoryDeleteView
              history={defaultValues}
              loading={deleting}
              onDelete={() => deleteHistory(historyId)}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
