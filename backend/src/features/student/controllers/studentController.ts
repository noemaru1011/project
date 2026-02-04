import { StudentService } from '@/features/student/services/studentService';
import type { StudentResponse, StudentSummary } from '@shared/models/student';
import { BaseController } from '@/base/controllers/baseController';

export class StudentController extends BaseController {
  constructor(private readonly studentService: StudentService) {
    super();
  }

  // 1件取得
  getStudent = this.asyncHandler<StudentResponse>(async (req, res) => {
    const { id } = req.params as { id: string };
    const student = await this.studentService.getStudent(id);
    return this.ok(res, student);
  });

  // 検索
  searchStudents = this.asyncHandler<StudentSummary[]>(async (req, res) => {
    const students = await this.studentService.searchStudents(req.body);
    return this.ok(res, students);
  });

  // 作成
  createStudent = this.asyncHandler<StudentResponse>(async (req, res) => {
    const student = await this.studentService.createStudent(req.body);
    return this.created(res, student);
  });

  // 更新
  updateStudent = this.asyncHandler<StudentResponse>(async (req, res) => {
    const { id } = req.params as { id: string };
    const student = await this.studentService.updateStudent(id, req.body);
    return this.updated(res, student);
  });

  // 削除
  deleteStudent = this.asyncHandler<null>(async (req, res) => {
    const { id } = req.params as { id: string };
    await this.studentService.deleteStudent(id);
    return this.deleted(res);
  });
}
