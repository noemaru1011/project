import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '@/services/departmentService';
import type { Apibody } from '@shared/types/api';
import type { Department } from '@shared/types/department';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageCode } from '@shared/apiMessage';

export const DepartmentController = {
  async getAllDepartments(_req: Request, res: Response<Apibody<Department[]>>, next: NextFunction) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      const key: ApiMessageCode = 'FETCH_SUCCESS';
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
