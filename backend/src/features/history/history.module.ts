import { PrismaClient } from '@prisma/client';
import { HistoryController } from '@/features/history/controllers/historyController';
import { HistoryService } from '@/features/history/service/historyService';
import { HistoryRepository } from '@/features/history/repositories/historyRepository';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import { StudentRepository } from '@/features/student/repositories/studentRepository';

export const createHistoryModule = (prisma: PrismaClient) => {
  const historyRepo = new HistoryRepository(prisma);
  const minorCategoryRepo = new MinorCategoryRepository(prisma);
  const studentRepo = new StudentRepository(prisma);

  const historyService = new HistoryService(historyRepo, minorCategoryRepo, studentRepo);

  const historyController = new HistoryController(historyService);

  return {
    historyController,
  };
};
