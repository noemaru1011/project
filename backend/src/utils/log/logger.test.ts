import { describe, it, expect } from 'vitest';
import { logger } from './logger'; // 実際のパスに合わせてください

// Winstonの内部シンボルを取得（フォーマット結果の文字列を取り出すため）
const MESSAGE = Symbol.for('message');

describe('Logger Configuration Tests', () => {
  // logger.ts の transports 配列の順番に依存して参照を取得
  // [0]: error, [1]: access, [2]: resource, [3]: prisma-query
  const accessTransport = logger.transports[1];
  const resourceTransport = logger.transports[2];
  const prismaTransport = logger.transports[3];

  /**
   * ヘルパー関数: 指定したTransportのフォーマットロジックだけを実行する
   * ファイル書き込みを行わず、メモリ上で結果を検証するために使用
   */
  const getFormattedMessage = (transport: any, info: any) => {
    // 1. グローバルフォーマット（timestamp付与など）を適用
    const globalInfo = logger.format.transform(info, { level: 'info' });

    // 2. Transport固有のフォーマットを適用
    const result = transport.format.transform(globalInfo);

    // フィルタリングされた場合は false が返る
    if (result === false) return false;

    // 文字列フォーマットの結果を取得 (JSONの場合はオブジェクト自体、Textの場合はMESSAGEシンボル)
    return result[MESSAGE] || result;
  };

  describe('Access Log (Standard)', () => {
    it('通常のアクセスログが正しくフォーマットされ、他のログには出力されないこと', () => {
      // === Arrange (準備) ===
      const info = {
        level: 'info',
        message: '',
        method: 'GET',
        url: '/api/users/1',
        status: 200,
        responseTime: 45,
      };

      // === Act (実行) ===
      const accessResult = getFormattedMessage(accessTransport, { ...info });
      const resourceResult = getFormattedMessage(resourceTransport, { ...info });
      const prismaResult = getFormattedMessage(prismaTransport, { ...info });

      // === Assert (検証) ===
      // 1. Accessログのフォーマット検証
      // 期待: [2026/01/21 10:00:00] GET /api/users/1 200 45ms
      expect(accessResult).toEqual(expect.stringContaining('GET /api/users/1 200 45ms'));
      // 日付部分の簡易チェック (正規表現)
      expect(accessResult).toMatch(/\[\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}\]/);

      // 2. 他のログではフィルタリングされること (false)
      expect(resourceResult).toBe(false);
      expect(prismaResult).toBe(false);
    });

    it('methodがない場合（起動ログ等）はメッセージのみ出力されること', () => {
      // === Arrange ===
      const info = {
        level: 'info',
        message: 'Server listening on port 3000',
      };

      // === Act ===
      const result = getFormattedMessage(accessTransport, { ...info });

      // === Assert ===
      expect(result).toEqual(expect.stringContaining('Server listening on port 3000'));
      expect(result).not.toContain('undefined');
    });
  });

  describe('Resource Log', () => {
    it('type="resource" の場合、JSON形式でResourceログのみに出力されること', () => {
      // === Arrange ===
      const info = {
        level: 'info',
        message: 'S3 Upload',
        type: 'resource',
        bucket: 'my-bucket',
        key: 'image.png',
      };

      // === Act ===
      const accessResult = getFormattedMessage(accessTransport, { ...info });
      const resourceResult = getFormattedMessage(resourceTransport, { ...info }); // ここでは文字列が返る
      const prismaResult = getFormattedMessage(prismaTransport, { ...info });

      // === Assert ===
      // 1. Accessログからは除外
      expect(accessResult).toBe(false);

      // 2. Resourceログの検証
      expect(resourceResult).not.toBe(false);

      // ★ 修正ポイント: 文字列(JSON)をオブジェクトに変換してから検証する
      // winston.format.json() は結果を文字列化するため、パースが必要です
      const parsedResource = JSON.parse(resourceResult as string);

      expect(parsedResource).toHaveProperty('bucket', 'my-bucket');
      expect(parsedResource).toHaveProperty('type', 'resource');

      // 3. Prismaログからは除外
      expect(prismaResult).toBe(false);
    });
  });

  describe('Prisma Query Log', () => {
    it('type="prisma-query" の場合、複数行テキストでPrismaログのみに出力されること', () => {
      // === Arrange ===
      const info = {
        level: 'info',
        message: '',
        type: 'prisma-query',
        duration: 120,
        sql: 'SELECT * FROM users WHERE id = ?',
        params: [1],
      };

      // === Act ===
      const accessResult = getFormattedMessage(accessTransport, { ...info });
      const prismaResult = getFormattedMessage(prismaTransport, { ...info });

      // === Assert ===
      // 1. Accessログからは除外
      expect(accessResult).toBe(false);

      // 2. Prismaログのフォーマット検証
      expect(prismaResult).toEqual(expect.stringContaining('Prisma Query'));
      expect(prismaResult).toEqual(expect.stringContaining('duration: 120ms'));
      // 改行を含むSQLの確認
      expect(prismaResult).toEqual(expect.stringContaining('sql:\nSELECT * FROM users'));
      expect(prismaResult).toEqual(expect.stringContaining('params:\n['));
    });
  });
});
