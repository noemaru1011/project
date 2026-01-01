import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useHistoryView } from '@/features/history/hooks/useHistoryView';
import { useHistoryUpdate } from '@/features/history/hooks/useHistoryUpdate';
import { HistoryUpdateView } from '@/features/history/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/constants/routes';

import type { HistoryUpdateForm as HistoryUpdateFormType } from '@shared/schemas/history';
import { updateValidation } from '@shared/schemas/history';

export const HistoryUpdatePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { history, loading } = useHistoryView(historyId);
  const { updateHistory, loading: updating } = useHistoryUpdate();
  const form = useForm<HistoryUpdateFormType>({
    resolver: zodResolver(updateValidation),
  });

  const { reset } = form;

  useEffect(() => {
    if (!history) return;

    reset({
      statusId: history.statusId.toString(),
      startTime: history.startTime,
      endTime: history.endTime ?? '',
      other: history.other ?? '',
      validFlag: history.validFlag,
      updatedAt: history.updatedAt,
    });
  }, [history, reset]);

  const onSubmit = async (data: HistoryUpdateFormType) => {
    if (!history) return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;

    try {
      const res = await updateHistory(history.historyId, data);
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

  const historyBasic = history
    ? {
        studentName: history.studentName,
        grade: history.grade.toString(),
        minorCategoryId: history.minorCategoryId.toString(),
        departmentId: history.departmentId.toString(),
      }
    : null;

  if (!historyBasic) {
    return <Loading loading={loading} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-10">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">履歴更新</h2>
        <HistoryUpdateView
          historyBasic={historyBasic}
          historyUpdate={form}
          onUpdate={form.handleSubmit(onSubmit)}
          onBack={() => navigate(ROUTES.HISTORY.INDEX)}
          loading={updating}
        />
      </div>
    </div>
  );
};
