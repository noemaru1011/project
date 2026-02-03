import { DepartmentService } from '@/features/department/services/departmentService';
import type { Department } from '@shared/models/master';
import { BaseController } from '@/base/controllers/baseController';

export class DepartmentController extends BaseController {
  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  getAllDepartments = this.asyncHandler<Department[]>(async (_req, res) => {
    const departments = await this.departmentService.getAllDepartments();

    return this.ok(res, departments);
  });
}
