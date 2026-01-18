import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { historyApi } from '@/features/history/api';
import type { StudentBasicInfo, HistoryUpdateInput } from '@shared/models/history';
import { HistoryBasicInfo, HistoryDeleteView } from '@/features/history/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { handleApiErrorWithUI } from '@/utils/handleApiError';
import { ROUTES } from '@/routes/routes';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export const HistoryDeletePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const queryClient = useQueryClient();

  // 1. 履歴データの取得 (useQuery)
  const { data: response, isLoading } = useQuery({
    queryKey: ['history', historyId],
    queryFn: () => historyApi.view(historyId!),
    enabled: !!historyId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const history = response?.data;

  // 2. 削除実行 (useMutation)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => historyApi.delete(id),
    onSuccess: () => {
      // 削除に成功したら履歴一覧のキャッシュを無効化する
      queryClient.invalidateQueries({ queryKey: ['histories'] });
      toast.success(APIMESSAGE.DELETE_SUCCESS);
      navigate(ROUTES.HISTORY.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  // IDがない場合のガード
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  // データ取得中の表示
  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  // データが見つからない場合のガード
  if (!history) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  // マッピング処理
  const historyBasic: StudentBasicInfo = {
    studentName: history.studentName,
    grade: history.grade,
    minorCategoryName: history.minorCategoryName,
    departmentName: history.departmentName,
  };

  const historyDelete: HistoryUpdateInput = {
    statusId: history.statusId,
    startTime: history.startTime,
    endTime: history.endTime ?? '',
    other: history.other ?? '',
    updatedAt: history.updatedAt,
    validFlag: history.validFlag,
  };

  const handleSubmit = () => {
    deleteMutation.mutate(history.historyId);
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

          {/* 右：削除確認フォーム */}
          <div className="space-y-6">
            <HistoryDeleteView
              history={historyDelete}
              loading={deleteMutation.isPending} // 削除中のステート
              onDelete={handleSubmit}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
