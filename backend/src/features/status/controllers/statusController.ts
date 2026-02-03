import { StatusService } from '@/features/status/services/statusService';
import type { Status } from '@shared/models/master';
import { BaseController } from '@/base/controllers/baseController';

export class StatusController extends BaseController {
  constructor(private readonly statusService: StatusService) {
    super();
  }

  getAllStatuses = this.asyncHandler<Status[]>(async (_req, res) => {
    const statuses = await this.statusService.getAllstatuses();

    return this.ok(res, statuses);
  });
}
