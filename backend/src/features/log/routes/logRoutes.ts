import { Router } from 'express';
import { logController } from '@/buildAppModules';

const router = Router();

router.get('/', logController.downloadLogs);

export default router;
