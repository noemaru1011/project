import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { studentRequestSchema } from '@/schema/student.Request';
import { StudentController } from '@/controllers/studentController';

const router = Router();

router.get('/', StudentController.getAllStudents);

router.get('/:id', StudentController.getStudent);

router.post('/search', StudentController.searchStudents);

router.post('/', validateBody(studentRequestSchema), StudentController.createStudent);

router.put('/:id', validateBody(studentRequestSchema), StudentController.updateStudent);

router.delete('/:id', StudentController.deleteStudet);

export default router;
