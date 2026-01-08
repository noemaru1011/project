import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation } from '@shared/schemas/password';
import { PasswordController } from '@/controllers/passwordController';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post('/', csrfMiddleware, validateBody(validation), PasswordController.updatePassword);

export default router;
