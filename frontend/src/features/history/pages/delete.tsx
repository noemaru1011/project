import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useHistoryDelete } from '@/features/history/hooks/useHistoryDelete';
import { useHistoryView } from '@/features/history/hooks/useHistoryView';

import { HistoryDeleteView } from '@/features/history/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/constants/routes';

export const HistoryDeletePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  if (!historyId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { history, loading } = useHistoryView(historyId);
  const { deleteHistory, loading: deleting } = useHistoryDelete();

  const handleDelete = async () => {
    if (!history) return;
    try {
      const res = await deleteHistory(history.historyId);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };
  const historyBasic = history
    ? {
        studentName: history.studentName,
        grade: history.grade,
        minorCategoryId: history.minorCategoryId,
        departmentId: history.departmentId,
      }
    : null;

  const historyDelete = history
    ? {
        statusId: history.statusId,
        startTime: history.startTime,
        endTime: history.endTime ?? undefined,
        other: history.other,
        updatedAt: history.updatedAt,
        validFlag: history.validFlag,
      }
    : null;

  if (!historyBasic || !historyDelete) {
    return <Loading loading />;
  }

  return (
    <Loading loading={loading || deleting}>
      <HistoryDeleteView
        historyBasic={historyBasic}
        historyDelete={historyDelete}
        onDelete={handleDelete}
        onBack={() => navigate(ROUTES.HISTORY.INDEX)}
      />
    </Loading>
  );
};
