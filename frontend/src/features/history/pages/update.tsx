import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { historyApi } from '@/features/history/api';
import { HistoryUpdateForm } from '@/features/history/components';
import { HistoryBasicInfo } from '@/features/history/components';
import type { StudentBasicInfo, HistoryUpdateInput } from '@shared/models/history';
import { Loading } from '@/components/ui/Loading/Loading';
import { handleApiErrorWithUI } from '@/utils/handleApiError';
import { ROUTES } from '@/routes/routes';

export const HistoryUpdatePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const queryClient = useQueryClient();

  // 1. 履歴データの取得
  const { data: response, isLoading } = useQuery({
    queryKey: ['history', historyId],
    queryFn: () => historyApi.view(historyId!),
    enabled: !!historyId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const history = response?.data;

  // 2. 履歴データの更新
  const updateMutation = useMutation({
    mutationFn: (data: HistoryUpdateInput) => historyApi.update(historyId!, data),
    onSuccess: (res) => {
      // 一覧と、この詳細データのキャッシュを更新
      queryClient.invalidateQueries({ queryKey: ['histories'] });
      queryClient.invalidateQueries({ queryKey: ['history', historyId] });

      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  // IDがない場合は即リダイレクト
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  // 取得中、またはデータがまだ無い場合の表示
  if (isLoading || !history) {
    return <Loading loading={isLoading} />;
  }

  // マッピング処理
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
    minorCategoryName: history.minorCategoryName,
    departmentName: history.departmentName,
  };

  const handleSubmit = (data: HistoryUpdateInput) => {
    updateMutation.mutate(data);
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
              loading={updateMutation.isPending}
              onSubmit={handleSubmit}
              onBack={() => navigate(ROUTES.HISTORY.INDEX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
