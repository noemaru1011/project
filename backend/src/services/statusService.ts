import { StatusRepository } from '@/repositories/statusRepository';
import type { Status } from '@shared/models/master';

export const StatusService = {
  async getAllstatuses(): Promise<Status[]> {
    const statuses = await StatusRepository.findAll();
    return statuses.map((status) => ({
      statusId: status.statusId.toString(),
      statusName: status.statusName,
    }));
  },
};
