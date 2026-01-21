import app from './app';
import { logger } from '@/utils/log/logger';
import { monitorEventLoopDelay } from 'perf_hooks';

const PORT = Number(process.env.BACK_PORT) || 3000;
const HOST = process.env.BACK_HOST || '0.0.0.0';

// ===== プロセス監視 =====
process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', { reason: String(reason) });
});

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException', { message: err.message, stack: err.stack });
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down');
  process.exit(0);
});

// ===== リソース監視 =====
const h = monitorEventLoopDelay();
h.enable();

setInterval(() => {
  const mem = process.memoryUsage();
  const cpu = process.cpuUsage();

  logger.info('system_resource', {
    type: 'resource',
    rss: mem.rss,
    heapUsed: mem.heapUsed,
    heapTotal: mem.heapTotal,
    cpuUser: cpu.user,
    cpuSystem: cpu.system,
    eventLoopP99: h.percentile(99),
  });
}, 30_000);

// ===== サーバー起動 =====
app.listen(PORT, HOST, () => {
  logger.info(`Backend running: ${process.env.BACK_URL || `http://${HOST}:${PORT}`}`);
});
