import { Router } from 'express';
import { downloadLogsController } from '@/controllers/logController';

const router = Router();

router.get('/', downloadLogsController);

export default router;
