import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation, serverUpdateValidation } from '@shared/schemas/student';
import { StudentController } from '@/controllers/studentController';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.get('/:id', StudentController.getStudent);

router.post('/', csrfMiddleware, validateBody(serverValidation), StudentController.createStudent);

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(serverUpdateValidation),
  StudentController.updateStudent,
);

router.delete('/:id', csrfMiddleware, StudentController.deleteStudet);

export default router;
