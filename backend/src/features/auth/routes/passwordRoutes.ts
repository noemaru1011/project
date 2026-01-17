import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { PasswordUpdateSchema } from '@shared/models/auth';
import { passwordController } from '@/buildAppModules';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post(
  '/',
  csrfMiddleware,
  validateBody(PasswordUpdateSchema),
  passwordController.updatePassword,
);

export default router;
