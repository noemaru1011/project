import { Request, Response } from 'express';
import { StudentService } from '@/services/studentService';
import { AppError } from '@/errors/AppError';

export const StudentController = {
  async getStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '学生が見つかりません' });
      }

      const student = await StudentService.getStudent(id);
      if (!student) {
        return res.status(404).json({ message: '学生が見つかりません' });
      }

      return res.json({ data: student, message: '取得成功' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async searchStudents(req: Request, res: Response) {
    try {
      const students = await StudentService.searchStudents(req.body);
      return res.status(200).json({ data: students, message: '取得成功' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async createStudent(req: Request, res: Response) {
    try {
      await StudentService.createStudent(req.body);
      return res.status(201).json({ message: '追加完了' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async updateStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '学生が見つかりません' });
      }
      await StudentService.updateStudent(req.body, id);
      return res.status(200).json({ message: '更新完了' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async deleteStudet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '学生が見つかりません' });
      }

      await StudentService.deleteStudent(id);
      return res.status(200).json({ message: '削除完了' });
    } catch (err) {
      return handleError(err, res);
    }
  },
};

function handleError(err: unknown, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    message: '予期せぬエラーが発生しました',
  });
}
