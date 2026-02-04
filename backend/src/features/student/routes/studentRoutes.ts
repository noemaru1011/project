import { Router } from 'express';
import { StudentServerCreateSchema, StudentServerUpdateSchema } from '@shared/models/student';
import { studentController } from '@/buildAppModules';
import { csrfMiddleware, validateBody } from '@/middleware';
const isProd = process.env.NODE_ENV === 'production';

const router = Router();

router.get('/:id', studentController.getStudent);

//本番環境では新規作成を禁止
if (!isProd) {
  router.post(
    '/',
    csrfMiddleware,
    validateBody(StudentServerCreateSchema),
    studentController.createStudent,
  );
} else {
  router.post('/', (_req, res) => res.status(404).send('Not found'));
}

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(StudentServerUpdateSchema),
  studentController.updateStudent,
);

router.delete('/:id', csrfMiddleware, studentController.deleteStudent);

export default router;
