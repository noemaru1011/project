import { useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ROUTES } from '@/routes/routes';
import { Loading } from '@/components/ui/Loading/Loading';
import { HistoryUpdateForm, HistoryBasicInfo } from '@/features/history/components';
import { useViewHistory } from '@/features/history/hooks/useViewHistory';
import { useUpdateHistory } from '@/features/history/hooks/useUpdateHistory';
import { handleApiErrorWithUI } from '@/utils';
import type { HistoryUpdateInput } from '@shared/models/history';

export const HistoryUpdatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { historyId } = useParams<{ historyId: string }>();

  // IDがない場合は即リダイレクト
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  // データ取得Hook
  const { defaultValues, historyBasic, isLoading, isError, error } = useViewHistory(historyId);
  // 更新Hook
  const { updateHistory, updating } = useUpdateHistory();

  // データ取得失敗時のエラーハンドリング
  useEffect(() => {
    if (isError && error) {
      handleApiErrorWithUI(error, navigate);
    }
  }, [isError, error, navigate]);

  // 更新処理のハンドラ
  const handleSubmit = (data: HistoryUpdateInput) => {
    updateHistory(
      { historyId, data },
      {
        onSuccess: (res) => {
          // キャッシュの無効化
          queryClient.invalidateQueries({ queryKey: ['histories'] });
          queryClient.invalidateQueries({ queryKey: ['history', historyId] });

          toast.success(res.message);
          navigate(ROUTES.HISTORY.INDEX);
        },
        onError: (err) => handleApiErrorWithUI(err, navigate),
      },
    );
  };

  if (isLoading) return <Loading loading />;

  // 取得完了後、データが欠損している場合は404へ
  if (!defaultValues || !historyBasic) {
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
              onSubmit={handleSubmit}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
