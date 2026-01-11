import { Request, Response, NextFunction } from 'express';
import { StudentService } from '@/services/studentService';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const StudentController = {
  async getStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_STUDENT });
      }
      const student = await StudentService.getStudent(id);
      if (!student) {
        return res.status(404).json({ message: APIMESSAGE.NO_STUDENT });
      }
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      return res.status(200).json({ code: key, data: student, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async searchStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await StudentService.searchStudents(req.body);
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      return res.status(200).json({ code: key, data: students, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      await StudentService.createStudent(req.body);
      const key: ApiMessageKey = 'CREATE_SUCCESS';
      return res.status(201).json({ code: key, message: APIMESSAGE.CREATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_STUDENT });
      }
      await StudentService.updateStudent(id, req.body);
      const key: ApiMessageKey = 'UPDATE_SUCCESS';
      return res.status(200).json({ code: key, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async deleteStudet(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_STUDENT });
      }
      await StudentService.deleteStudent(id);
      const key: ApiMessageKey = 'DELETE_SUCCESS';
      return res.status(200).json({ code: key, message: APIMESSAGE.DELETE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
