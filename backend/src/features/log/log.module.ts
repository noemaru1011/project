import { LogController } from '@/features/log/controllers/logController';
import { LogService } from '@/features/log/services/logService';
import { LogRepository } from '@/features/log/repositories/logRepository';

export const createLogModule = () => {
  const logRepo = new LogRepository();
  const logService = new LogService(logRepo);
  const logController = new LogController(logService);

  return {
    logController,
  };
};
