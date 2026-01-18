import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { createLogger } from './logger';

const getTodayJstDate = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

describe('logger (daily rotate)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logger-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('info ログが 当日の access-YYYY-MM-DD.log に書き込まれる', async () => {
    const logger = createLogger(tempDir);
    const today = getTodayJstDate();

    logger.info('hello world');

    await new Promise((r) => setTimeout(r, 100));

    const files = fs.readdirSync(tempDir);
    const accessLog = files.find((f) => f.startsWith(`access-${today}`));

    expect(accessLog).toBeDefined();

    const log = fs.readFileSync(path.join(tempDir, accessLog!), 'utf-8');

    const json = JSON.parse(log.trim());

    expect(json.message).toBe('hello world');
    expect(json.level).toBe('info');
  });

  it('error ログが 当日の error-YYYY-MM-DD.log に書き込まれる', async () => {
    const logger = createLogger(tempDir);
    const today = getTodayJstDate();

    logger.error('fatal');

    await new Promise((r) => setTimeout(r, 100));

    const files = fs.readdirSync(tempDir);
    const errorLog = files.find((f) => f.startsWith(`error-${today}`));

    expect(errorLog).toBeDefined();

    const log = fs.readFileSync(path.join(tempDir, errorLog!), 'utf-8');

    const json = JSON.parse(log.trim());

    expect(json.message).toBe('fatal');
    expect(json.level).toBe('error');
  });
});
