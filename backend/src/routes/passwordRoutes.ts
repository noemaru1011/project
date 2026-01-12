import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { PasswordUpdateSchema } from '@shared/models/auth';
import { PasswordController } from '@/controllers/passwordController';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post('/', csrfMiddleware, validateBody(PasswordUpdateSchema), PasswordController.updatePassword);

export default router;
