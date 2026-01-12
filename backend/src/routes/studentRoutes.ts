import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerCreateSchema, StudentServerUpdateSchema } from '@shared/models/student';
import { StudentController } from '@/controllers/studentController';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.get('/:id', StudentController.getStudent);

router.post('/', csrfMiddleware, validateBody(StudentServerCreateSchema), StudentController.createStudent);

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(StudentServerUpdateSchema),
  StudentController.updateStudent,
);

router.delete('/:id', csrfMiddleware, StudentController.deleteStudet);

export default router;
