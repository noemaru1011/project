import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { historyApi } from '@/features/history/api';
import { handleApiErrorWithUI } from '@/utils';
import type { HistoryUpdateInput, StudentBasicInfo } from '@shared/models/history';

export function useViewHistory(historyId?: string) {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['history', historyId],
    queryFn: () => historyApi.view(historyId!),
    enabled: !!historyId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const history = query.data?.data ?? undefined;

  const defaultValues: HistoryUpdateInput | undefined = history && {
    statusId: history.statusId,
    other: history.other ?? '',
    startTime: history.startTime,
    endTime: history.endTime ?? '',
    validFlag: history.validFlag,
    updatedAt: history.updatedAt,
  };

  const historyBasic: StudentBasicInfo | undefined = history && {
    studentName: history.studentName,
    grade: history.grade,
    minorCategoryName: history.minorCategoryName,
    departmentName: history.departmentName,
  };

  return {
    history,
    defaultValues,
    historyBasic,
    loading: query.isLoading,
  };
}
