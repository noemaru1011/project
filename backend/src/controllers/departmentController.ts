import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '@/services/departmentService';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const DepartmentController = {
  async getAllDepartments(_req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      return res.status(200).json({
        code: key,
        data: departments,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
