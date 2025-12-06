import { HistoryRepository } from '@/repositories/historyRepository';

export const HistoryService = {
  async createHistory(data: {
    studentIds: string[];
    StatusId: number;
    other: string;
    startTime: string;
    endTime?: string | null;
  }) {
    // 履歴テーブルに登録
    await HistoryRepository.createHistory({
      studentId: data.studentIds,
      StatusId: data.StatusId,
      other: data.other,
      startTime: new Date(data.startTime),
      endTime: data.endTime ? new Date(data.endTime) : null,
    });
  },
};
