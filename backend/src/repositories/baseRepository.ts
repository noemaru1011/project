import { Prisma, PrismaClient } from '@prisma/client';

export abstract class BaseRepository {
  constructor(protected prisma: Prisma.TransactionClient | PrismaClient) {}

  /**
   * トランザクション用の新しいインスタンスを作成するためのヘルパー
   * 各リポジトリでオーバーライドして、新しいトランザクション用インスタンスを返すようにします
   */
  abstract withTransaction(tx: Prisma.TransactionClient): BaseRepository;
}
