import { StatusRepository } from '@/repositories/statusRepository';
import type { Status } from '@shared/models/master';

export class StatusService {
  constructor(private statusRepo: StatusRepository) {}

  async getAllstatuses(): Promise<Status[]> {
    const statuses = await this.statusRepo.findAll();
    return statuses.map((status) => ({
      statusId: status.statusId.toString(),
      statusName: status.statusName,
    }));
  }
}
