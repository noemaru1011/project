import { PrismaClient } from '@prisma/client';
import { PasswordController } from '@/features/auth/controllers/passwordController';
import { PasswordService } from '@/features/auth/services/passwordService';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';

export const createPasswordModule = (prisma: PrismaClient) => {
  const passwordRepo = new PasswordRepository(prisma);

  const passwordService = new PasswordService(passwordRepo);

  const passwordController = new PasswordController(passwordService);

  return {
    passwordController,
  };
};
