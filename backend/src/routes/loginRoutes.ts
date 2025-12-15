import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation } from '@/../../shared/schemas/login';
import { LoginController } from '@/controllers/loginController';

const router = Router();

router.post('/', validateBody(validation), LoginController.login);

export default router;
