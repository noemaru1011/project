import { PrismaClient } from '@prisma/client';
import { createLoginModule } from '@/features/auth/login.module';
import { createLogoutModule } from '@/features/auth/logout.module';
import { createPasswordModule } from '@/features/auth/password.module';
import { createStudentModule } from '@/features/student/student.module';
import { createCategoryModule } from '@/features/category/category.module';
import { createSubCategoryModule } from '@/features/subCategory/subCategory.module';
import { createMinorCategoryModule } from '@/features/minorCategory/minorCategory.module';
import { createStatusModule } from '@/features/status/status.module';
import { createDepartmentModule } from '@/features/department/department.module';
import { createHistoryModule } from '@/features/history/history.module';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

// Student
export const { studentController } = createStudentModule(prisma);

// Category
export const { categoryController } = createCategoryModule(prisma);

// SubCategory
export const { subCategoryController } = createSubCategoryModule(prisma);

// MinorCategory
export const { minorCategoryController } = createMinorCategoryModule(prisma);

// Status
export const { statusController } = createStatusModule(prisma);

// Department
export const { departmentController } = createDepartmentModule(prisma);

// History
export const { historyController } = createHistoryModule(prisma);

// Auth
export const { loginController } = createLoginModule(prisma);
export const { logoutController } = createLogoutModule();
export const { passwordController } = createPasswordModule(prisma);
