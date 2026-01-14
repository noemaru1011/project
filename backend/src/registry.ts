import { PrismaClient } from '@prisma/client';
import { StudentRepository } from './repositories/studentRepository';
import { PasswordRepository } from './repositories/passwordRepository';
import { MinorCategoryRepository } from './repositories/minorCategoryRepository';
import { CategoryRepository } from './repositories/categoryRepository';
import { DepartmentRepository } from './repositories/departmentRepository';
import { StatusRepository } from './repositories/statusRepository';
import { SubCategoryRepository } from './repositories/subCategoryRepository';
import { HistoryRepository } from './repositories/historyRepository';
import { AdminRepository } from './repositories/adminRepository';
import { LogRepository } from './repositories/logRepository';
import { StudentService } from './services/studentService';
import { CategoryService } from './services/categoryService';
import { DepartmentService } from './services/departmentService';
import { StatusService } from './services/statusService';
import { SubCategoryService } from './services/subCategoryService';
import { HistoryService } from './services/historyService';
import { PasswordService } from './services/passwordService';
import { LoginService } from './services/loginService';
import { LogService } from './services/logService';
import { StudentController } from './controllers/studentController';
import { CategoryController } from './controllers/categoryController';
import { DepartmentController } from './controllers/departmentController';
import { StatusController } from './controllers/statusController';
import { SubCategoryController } from './controllers/subCategoryController';
import { HistoryController } from './controllers/historyController';
import { PasswordController } from './controllers/passwordController';
import { LoginController } from './controllers/loginController';
import { LogoutController } from './controllers/logoutController';
import { LogController } from './controllers/logController';
import { sendAccountEmail } from './utils/mail/sendAccountEmail';
import { generatePassword } from './utils/common/generatePassword';

// 1. PrismaClient (シングルトン)
export const prisma = new PrismaClient();

// 2. Repositories
export const studentRepo = new StudentRepository(prisma);
export const passwordRepo = new PasswordRepository(prisma);
export const minorCategoryRepo = new MinorCategoryRepository(prisma);
export const categoryRepo = new CategoryRepository(prisma);
export const departmentRepo = new DepartmentRepository(prisma);
export const statusRepo = new StatusRepository(prisma);
export const subCategoryRepo = new SubCategoryRepository(prisma);
export const historyRepo = new HistoryRepository(prisma);
export const adminRepo = new AdminRepository(prisma);
export const logRepo = new LogRepository();

// 3. Services
export const studentService = new StudentService(
  prisma,
  studentRepo,
  passwordRepo,
  minorCategoryRepo,
  sendAccountEmail,
  generatePassword,
);
export const categoryService = new CategoryService(categoryRepo);
export const departmentService = new DepartmentService(departmentRepo);
export const statusService = new StatusService(statusRepo);
export const subCategoryService = new SubCategoryService(subCategoryRepo);
export const historyService = new HistoryService(historyRepo, minorCategoryRepo);
export const passwordService = new PasswordService(passwordRepo);
export const loginService = new LoginService(adminRepo, studentRepo, passwordRepo);
export const logService = new LogService(logRepo);

// 4. Controllers
export const studentController = new StudentController(studentService);
export const categoryController = new CategoryController(categoryService);
export const departmentController = new DepartmentController(departmentService);
export const statusController = new StatusController(statusService);
export const subCategoryController = new SubCategoryController(subCategoryService);
export const historyController = new HistoryController(historyService);
export const passwordController = new PasswordController(passwordService);
export const loginController = new LoginController(loginService);
export const logoutController = new LogoutController();
export const logController = new LogController(logService);
