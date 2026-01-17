import { PrismaClient } from '@prisma/client';
import { LoginController } from '@/features/auth/controllers/loginController';
import { LoginService } from '@/features/auth/services/loginService';
import { AdminRepository } from '@/features/auth/repositories/adminRepository';
import { StudentRepository } from '@/features/student/repositories/studentRepository';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';

export const createLoginModule = (prisma: PrismaClient) => {
  const adminRepo = new AdminRepository(prisma);
  const stundetRepo = new StudentRepository(prisma);
  const passwordRepo = new PasswordRepository(prisma);

  const loginService = new LoginService(adminRepo, stundetRepo, passwordRepo);

  const loginController = new LoginController(loginService);

  return {
    loginController,
  };
};
