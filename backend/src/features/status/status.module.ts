import { PrismaClient } from '@prisma/client';
import { StatusController } from '@/features/status/controllers/statusController';
import { StatusService } from '@/features/status/services/statusService';
import { StatusRepository } from '@/features/status/repositories/statusRepository';

export const createStatusModule = (prisma: PrismaClient) => {
  const statusRepo = new StatusRepository(prisma);

  const statusService = new StatusService(statusRepo);

  const statusController = new StatusController(statusService);

  return {
    statusController,
  };
};
