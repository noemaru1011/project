import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { createLogger } from './logger';

describe('logger', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logger-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('info ログが access.log に書き込まれる', async () => {
    const logger = createLogger(tempDir);

    const before = new Date();

    logger.info('hello world');

    await new Promise((r) => setTimeout(r, 50));

    const log = fs.readFileSync(path.join(tempDir, 'access.log'), 'utf-8');

    const json = JSON.parse(log.trim());

    expect(json.message).toBe('hello world');

    // JSTでフォーマットされているかを検証
    const jst = new Date(before.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const yyyy = jst.getFullYear();

    expect(json.timestamp.startsWith(String(yyyy))).toBe(true);
  });

  it('error ログが error.log に書き込まれる', async () => {
    const logger = createLogger(tempDir);

    logger.error('fatal');

    await new Promise((r) => setTimeout(r, 50));

    const log = fs.readFileSync(path.join(tempDir, 'error.log'), 'utf-8');
    const json = JSON.parse(log.trim());

    expect(json.message).toBe('fatal');
    expect(json.level).toBe('error');
  });
});
