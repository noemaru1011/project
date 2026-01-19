import { Prisma, PrismaClient } from '@prisma/client';
import { logger } from '@/utils/log/logger';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('query', (e) => {
  let maskedParams = e.params;

  try {
    const paramsArray = JSON.parse(e.params);
    maskedParams = JSON.stringify(
      paramsArray.map((p: any) => ({
        ...p,
        password: p.password ? '***' : p.password,
      })),
    );
  } catch {}

  logger.info('Prisma query executed', {
    type: 'prisma-query',
    sql: e.query,
    params: maskedParams,
    duration: e.duration,
  });
});

export abstract class BaseRepository {
  constructor(protected prisma: Prisma.TransactionClient | PrismaClient) {}

  /**
   * トランザクション用の新しいインスタンスを作成するためのヘルパー
   * 各リポジトリでオーバーライドして、新しいトランザクション用インスタンスを返すようにします
   */
  abstract withTransaction(tx: Prisma.TransactionClient): BaseRepository;
}
