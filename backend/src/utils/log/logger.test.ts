import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { logger } from './logger';
import DailyRotateFile from 'winston-daily-rotate-file';

// ------------------------------------------------------------------
// 1. Arrange: Loggerの実態から設定を抽出する
// ------------------------------------------------------------------

// logger.ts で定義された実際のディレクトリを取得
// (process.env.NODE_ENV に依存する実装を確実に追いかけるため)
const transport = logger.transports.find((t) => t instanceof DailyRotateFile) as any;
const ACTUAL_LOG_DIR = transport?.dirname || 'logs-test';

const getJstDateString = () => {
  const options = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as const;
  const parts = new Intl.DateTimeFormat('ja-JP', options).formatToParts(new Date());
  const y = parts.find((p) => p.type === 'year')?.value;
  const m = parts.find((p) => p.type === 'month')?.value;
  const d = parts.find((p) => p.type === 'day')?.value;
  return `${y}-${m}-${d}`;
};

const waitForLog = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Logger Integration Test (AAA Pattern)', () => {
  const today = getJstDateString();

  beforeAll(() => {
    console.log(`Checking logs in: ${path.resolve(ACTUAL_LOG_DIR)}`);
    if (!fs.existsSync(ACTUAL_LOG_DIR)) {
      fs.mkdirSync(ACTUAL_LOG_DIR, { recursive: true });
    }
  });

  it('通常の info ログは access ログのみに書き込まれる', async () => {
    // Arrange
    const message = `info-test-${Date.now()}`;
    const logPath = path.join(ACTUAL_LOG_DIR, `access-${today}.log`);

    // Act
    logger.info(message);
    await waitForLog();

    // Assert
    expect(fs.existsSync(logPath), `File not found: ${logPath}`).toBe(true);
    const content = fs.readFileSync(logPath, 'utf-8');
    expect(content).toContain(message);
  });

  it('error ログは error ログファイルに書き込まれる', async () => {
    // Arrange
    const message = `error-test-${Date.now()}`;
    const logPath = path.join(ACTUAL_LOG_DIR, `error-${today}.log`);

    // Act
    logger.error(message);
    await waitForLog();

    // Assert
    expect(fs.existsSync(logPath), `File not found: ${logPath}`).toBe(true);
    const content = fs.readFileSync(logPath, 'utf-8');
    expect(content).toContain(message);
    expect(content).toContain('"level":"error"');
  });

  it('type: resource のログは resource ログのみに書き込まれる', async () => {
    // Arrange
    const message = `res-test-${Date.now()}`;
    const logPath = path.join(ACTUAL_LOG_DIR, `resource-${today}.log`);
    const accessPath = path.join(ACTUAL_LOG_DIR, `access-${today}.log`);

    // Act
    logger.info(message, { type: 'resource' });
    await waitForLog();

    // Assert
    expect(fs.existsSync(logPath), `File not found: ${logPath}`).toBe(true);
    expect(fs.readFileSync(logPath, 'utf-8')).toContain(message);

    // Accessログには入っていないことの確認
    if (fs.existsSync(accessPath)) {
      expect(fs.readFileSync(accessPath, 'utf-8')).not.toContain(message);
    }
  });

  it('type: prisma-query のログは専用ファイルに書き込まれる', async () => {
    // Arrange
    const message = `prisma-test-${Date.now()}`;
    const logPath = path.join(ACTUAL_LOG_DIR, `prisma-query-${today}.log`);

    // Act
    logger.info(message, { type: 'prisma-query' });
    await waitForLog();

    // Assert
    expect(fs.existsSync(logPath), `File not found: ${logPath}`).toBe(true);
    expect(fs.readFileSync(logPath, 'utf-8')).toContain(message);
  });
});
