import { Request, Response } from 'express';
import { StudentService } from '@/services/studentService';

export const StudentController = {
  async getAllStudents(req: Request, res: Response) {
    try {
      const students = await StudentService.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },

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

      res.json(student);
    } catch (error) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },

  async searchStudents(req: Request, res: Response) {
    try {
      console.log(req.body);
      const students = await StudentService.searchStudents(req.body);
      res.json(students);
    } catch (err: any) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },

  async createStudent(req: Request, res: Response) {
    try {
      console.log(req.body);
      await StudentService.createStudent(req.body);
      res.status(201).json({ message: '追加完了' });
    } catch (err: any) {
      if (err.code === 'P2002' && err.meta?.target?.includes('studentEmail')) {
        return res.status(400).json({ message: 'このメールアドレスはすでに登録されています' });
      }

      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },

  async updateStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '学生が見つかりません' });
      }
      await StudentService.updateStudent(req.body, id);
      res.status(201).json({ message: '更新完了' });
    } catch (err: any) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },

  async deleteStudet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '学生が見つかりません' });
      }
      await StudentService.deleteStudent(id);
      res.status(201).json({ message: '削除完了' });
    } catch (err: any) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },
};
