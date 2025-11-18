import { Router } from 'express';
import { LogoutController } from '@/controllers/logoutController';

const router = Router();

router.post('/', LogoutController.logout);

export default router;
