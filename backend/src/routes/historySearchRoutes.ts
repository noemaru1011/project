import { Router } from 'express';
import { HistoryController } from '@/controllers/historyController';

const router = Router();

router.post('/', HistoryController.searchHitories);

export default router;
