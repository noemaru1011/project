import { useQuery } from '@tanstack/react-query';
import { historyApi } from '@/features/history/api';
import type { HistoryUpdateInput, StudentBasicInfo } from '@shared/models/history';

export function useViewHistory(historyId?: string) {
  const query = useQuery({
    queryKey: ['history', historyId],
    queryFn: () => historyApi.view(historyId!),
    enabled: !!historyId,
  });

  const history = query.data?.data;

  // データ加工ロジックは Hook に残して Page をクリーンに保つ
  const defaultValues: HistoryUpdateInput | undefined = history
    ? {
        statusId: history.statusId,
        other: history.other ?? '',
        startTime: history.startTime,
        endTime: history.endTime ?? '',
        validFlag: history.validFlag,
        updatedAt: history.updatedAt,
      }
    : undefined;

  const historyBasic: StudentBasicInfo | undefined = history
    ? {
        studentName: history.studentName,
        grade: history.grade,
        minorCategoryName: history.minorCategoryName,
        departmentName: history.departmentName,
      }
    : undefined;

  return {
    history,
    defaultValues,
    historyBasic,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
