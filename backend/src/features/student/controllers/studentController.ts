import { Request, Response, NextFunction } from 'express';
import { StudentService } from '@/features/student/services/studentService';
import type { ApiBody } from '@shared/models/common';
import type { StudentResponse, StudentSummary } from '@shared/models/student';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  getStudent = async (
    req: Request,
    res: Response<ApiBody<StudentResponse>>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const student = await this.studentService.getStudent(id);
      if (!student) {
        return res
          .status(404)
          .json({ code: 'NO_STUDENT', data: null, message: APIMESSAGE.NO_STUDENT });
      }
      return res
        .status(200)
        .json({ code: 'FETCH_SUCCESS', data: student, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  searchStudents = async (
    req: Request,
    res: Response<ApiBody<StudentSummary[]>>,
    next: NextFunction,
  ) => {
    try {
      const students = await this.studentService.searchStudents(req.body);
      return res
        .status(200)
        .json({ code: 'FETCH_SUCCESS', data: students, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  createStudent = async (
    req: Request,
    res: Response<ApiBody<StudentResponse>>,
    next: NextFunction,
  ) => {
    try {
      const student = await this.studentService.createStudent(req.body);
      return res
        .status(201)
        .json({ code: 'CREATE_SUCCESS', data: student, message: APIMESSAGE.CREATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  updateStudent = async (
    req: Request,
    res: Response<ApiBody<StudentResponse>>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const student = await this.studentService.updateStudent(id, req.body);
      const key: ApiMessageCode = 'UPDATE_SUCCESS';
      return res.status(200).json({ code: key, data: student, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  deleteStudent = async (req: Request, res: Response<ApiBody<null>>, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.studentService.deleteStudent(id);
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  };
}
