import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerCreateSchema, StudentServerUpdateSchema } from '@shared/models/student';
import { StudentController } from '@/controllers/studentController';
import { StudentService } from '@/services/studentService';
import { StudentRepository } from '@/repositories/studentRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { sendAccountEmail } from '@/utils/mail/sendAccountEmail';
import { generatePassword } from '@/utils/common/generatePassword';
import { csrfMiddleware } from '@/middleware';

const router = Router();

// 依存関係の解決 (本来は DI コンテナなどを使うのが理想)
const prisma = new PrismaClient();
const studentRepo = new StudentRepository(prisma);
const passwordRepo = new PasswordRepository(prisma);
const minorCategoryRepo = new MinorCategoryRepository(prisma);

const studentService = new StudentService(
  prisma,
  studentRepo,
  passwordRepo,
  minorCategoryRepo,
  sendAccountEmail,
  generatePassword
);

const studentController = new StudentController(studentService);

router.get('/:id', studentController.getStudent);

router.post(
  '/',
  csrfMiddleware,
  validateBody(StudentServerCreateSchema),
  studentController.createStudent,
);

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(StudentServerUpdateSchema),
  studentController.updateStudent,
);

router.delete('/:id', csrfMiddleware, studentController.deleteStudent);

export default router;
