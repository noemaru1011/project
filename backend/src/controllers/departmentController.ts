import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '@/services/departmentService';
import type { ApiBody } from '@shared/models/common';
import type { Department } from '@shared/models/master';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export const DepartmentController = {
  async getAllDepartments(_req: Request, res: Response<ApiBody<Department[]>>, next: NextFunction) {
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
