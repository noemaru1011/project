import { DepartmentRepository } from '@/repositories/departmentRepository';

export const DepartmentService = {
  async getAllDepartments() {
    const departments = await DepartmentRepository.findAll();
    return departments;
  },
};
