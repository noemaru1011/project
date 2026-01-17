import { PrismaClient } from '@prisma/client';
import { DepartmentController } from '@/features/department/controllers/departmentController';
import { DepartmentService } from '@/features/department/services/departmentService';
import { DepartmentRepository } from '@/features/department/repositories/departmentRepository';

export const createDepartmentModule = (prisma: PrismaClient) => {
  const departmentRepo = new DepartmentRepository(prisma);

  const departmentService = new DepartmentService(departmentRepo);

  const departmentController = new DepartmentController(departmentService);

  return {
    departmentController,
  };
};
