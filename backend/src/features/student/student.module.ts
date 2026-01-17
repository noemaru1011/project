import { PrismaClient } from '@prisma/client';
import { StudentController } from '@/features/student/controllers/studentController';
import { StudentService } from '@/features/student/services/studentService';
import { StudentRepository } from '@/features/student/repositories/studentRepository';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import { sendAccountEmail } from '@/utils/mail/sendAccountEmail';

export const createStudentModule = (prisma: PrismaClient) => {
  const studentRepo = new StudentRepository(prisma);
  const passwordRepo = new PasswordRepository(prisma);
  const minorCategoryRepo = new MinorCategoryRepository(prisma);

  const studentService = new StudentService(
    prisma,
    studentRepo,
    passwordRepo,
    minorCategoryRepo,
    sendAccountEmail,
  );

  const studentController = new StudentController(studentService);

  return {
    studentController,
  };
};
