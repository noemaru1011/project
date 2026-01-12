import { DepartmentRepository } from '@/repositories/departmentRepository';
import type { Department } from '@shared/models/master';

export const DepartmentService = {
  async getAllDepartments(): Promise<Department[]> {
    const departments = await DepartmentRepository.findAll();
    return departments.map((department) => ({
      departmentId: department.departmentId.toString(),
      departmentName: department.departmentName,
    }));
  },
};
