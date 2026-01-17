import { Request, Response, NextFunction } from 'express';
import { StatusService } from '@/features/status/services/statusService';
import type { ApiBody } from '@shared/models/common';
import type { Status } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  getAllStatuses = async (_req: Request, res: Response<ApiBody<Status[]>>, next: NextFunction) => {
    try {
      const statuses = await this.statusService.getAllstatuses();
      res.status(200).json({
        code: 'FETCH_SUCCESS',
        data: statuses,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };
}
