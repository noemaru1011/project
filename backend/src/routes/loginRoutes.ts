import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { LoginSchema } from '@shared/models/auth';
import { LoginController } from '@/controllers/loginController';

const router = Router();

router.post('/', validateBody(LoginSchema), LoginController.login);

export default router;
