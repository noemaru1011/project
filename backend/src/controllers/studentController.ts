import { Request, Response, NextFunction } from 'express';
import { StudentService } from '@/services/studentService';
import { APIMESSAGE } from '@/constants/APIMESSAGE';

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

      return res.status(200).json({ data: student, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async searchStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await StudentService.searchStudents(req.body);
      return res.status(200).json({ data: students, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      await StudentService.createStudent(req.body);
      return res.status(201).json({ message: APIMESSAGE.CREATE_SUCCESS });
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
      await StudentService.updateStudent(req.body, id);
      return res.status(200).json({ message: APIMESSAGE.UPDATE_SUCCESS });
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
      return res.status(200).json({ message: APIMESSAGE.DELETE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
