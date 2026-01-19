import { PrismaClient } from '@prisma/client';
import { createLoginModule } from '@/features/auth/login.module';
import { createLogoutModule } from '@/features/auth/logout.module';
import { createPasswordModule } from '@/features/auth/password.module';
import { createLogModule } from '@/features/log/log.module';
import { createStudentModule } from '@/features/student/student.module';
import { createCategoryModule } from '@/features/category/category.module';
import { createSubCategoryModule } from '@/features/subCategory/subCategory.module';
import { createMinorCategoryModule } from '@/features/minorCategory/minorCategory.module';
import { createStatusModule } from '@/features/status/status.module';
import { createDepartmentModule } from '@/features/department/department.module';
import { createHistoryModule } from './features/history/history.module';
import { logger } from '@/utils/log/logger';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('query', (e) => {
  let maskedParams = e.params;

  try {
    const paramsArray = JSON.parse(e.params);
    maskedParams = JSON.stringify(
      paramsArray.map((p: any) => ({
        ...p,
        password: p.password ? '***' : p.password,
      })),
    );
  } catch {}

  logger.info('Prisma query executed', {
    type: 'prisma-query',
    sql: e.query,
    params: maskedParams,
    duration: e.duration,
  });
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

// Log
export const { logController } = createLogModule();
