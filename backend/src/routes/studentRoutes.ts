import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerCreateSchema, StudentServerUpdateSchema } from '@shared/models/student';
import { studentController } from '@/registry';
import { csrfMiddleware } from '@/middleware';

const router = Router();

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
