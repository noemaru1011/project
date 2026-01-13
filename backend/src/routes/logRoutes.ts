import { Router } from 'express';
import { logController } from '@/registry';

const router = Router();

router.get('/', logController.downloadLogs);

export default router;
