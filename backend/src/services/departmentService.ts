import { DepartmentRepository } from '@/repositories/departmentRepository';
import type { Department } from '@shared/models/master';

export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepository) {}

  async getAllDepartments(): Promise<Department[]> {
    const departments = await this.departmentRepo.findAll();
    return departments.map((department) => ({
      departmentId: department.departmentId.toString(),
      departmentName: department.departmentName,
    }));
  }
}
