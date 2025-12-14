import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '@/services/departmentService';
import { APIMESSAGE } from '@/constants/apiMessage';

export const DepartmentController = {
  async getAllDepartments(_req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      return res.status(200).json({
        data: departments,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
