import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { Loading } from '@/components/ui/Loading/Loading';
import { HistoryUpdateForm, HistoryBasicInfo } from '@/features/history/components';
import { useViewHistory } from '@/features/history/hooks/useViewHistory';
import { useUpdateHistory } from '@/features/history/hooks/useUpdateHistory';

export const HistoryUpdatePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();

  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { history, defaultValues, historyBasic, loading } = useViewHistory(historyId);

  const { updateHistory, updating } = useUpdateHistory(historyId);

  if (loading) {
    return <Loading loading />;
  }

  if (!history || !defaultValues || !historyBasic) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">履歴更新</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <HistoryBasicInfo stdent={historyBasic} />
          </div>

          <div className="space-y-6">
            <HistoryUpdateForm
              defaultValues={defaultValues}
              loading={updating}
              onSubmit={updateHistory}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
