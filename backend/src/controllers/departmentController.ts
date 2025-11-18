import { Request, Response } from 'express';
import { DepartmentService } from '@/services/departmentService';

export const DepartmentController = {
  async getAllDepartments(req: Request, res: Response) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },
};
