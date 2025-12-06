import { HistoryRepository } from '@/repositories/historyRepository';

export const HistoryService = {
  async createHistory(data: {
    studentId: string[];
    StatusId: number;
    other: string;
    startTime: Date;
    endTime?: Date | null;
  }) {
    await HistoryRepository.createHistory(data);
  },
};
