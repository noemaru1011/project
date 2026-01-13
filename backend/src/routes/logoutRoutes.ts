import { Router } from 'express';
import { logoutController } from '@/registry';

const router = Router();

router.post('/', logoutController.logout);

export default router;
