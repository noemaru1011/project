import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  const { history, loading } = useHistoryView(historyId!);
  const { updateHistory, loading: updating } = useHistoryUpdate();

  const form = useForm<HistoryUpdateFormType>({
    resolver: zodResolver(updateValidation),
  });

  const { reset } = form;

  // API → Form に流し込む
  useEffect(() => {
    if (!history) return;

    reset({
      statusId: history.statusId,
      startTime: history.startTime,
      endTime: history.endTime ?? '',
      other: history.other ?? '',
      validFlag: history.validFlag,
      updatedAt: history.updatedAt,
    });
  }, [history, reset]);

  const onSubmit = async (data: HistoryUpdateFormType) => {
    if (!historyId) return;

    try {
      const res = await updateHistory(historyId, data);
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

  if (!history) return <Loading loading />;

  const historyBasic = {
    studentName: history.studentName,
    grade: history.grade,
    minorCategoryId: history.minorCategoryId,
    departmentId: history.departmentId,
  };

  return (
    <Loading loading={loading || updating}>
      <HistoryUpdateView
        historyBasic={historyBasic}
        historyUpdate={form}
        onUpdate={form.handleSubmit(onSubmit)}
        onBack={() => navigate(ROUTES.HISTORY.INDEX)}
      />
    </Loading>
  );
};
