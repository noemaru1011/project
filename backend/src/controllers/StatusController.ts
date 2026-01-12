import { Request, Response, NextFunction } from 'express';
import { StatusService } from '@/services/statusService';
import type { Apibody } from '@shared/types/api';
import type { Status } from '@shared/types/status';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export const StatusController = {
  async getAllStatuses(_req: Request, res: Response<Apibody<Status[]>>, next: NextFunction) {
    try {
      const statuses = await StatusService.getAllstatuses();
      const key: ApiMessageCode = 'FETCH_SUCCESS';
      res.status(200).json({
        code: key,
        data: statuses,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
