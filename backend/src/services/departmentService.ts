import { DepartmentRepository } from "@/repositories/departmentRepository";

export const DepartmentService = {
  async getAllDepartments() {
    const departments = await DepartmentRepository.findAll();
    // ここで加工・フィルタ・ソートなどのビジネスロジックを実装可能
    return departments;
  },
};
