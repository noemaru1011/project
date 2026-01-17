import { Router } from 'express';
import { logoutController } from '@/buildAppModules';

const router = Router();

router.post('/', logoutController.logout);

export default router;
