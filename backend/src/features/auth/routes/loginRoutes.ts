import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { LoginSchema } from '@shared/models/auth';
import { loginController } from '@/buildAppModules';

const router = Router();

router.post('/', validateBody(LoginSchema), loginController.login);

export default router;
