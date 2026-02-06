import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tokenBlacklist } from './tokenBlacklist';

// in-memory store
const store = new Map<string, string>();

vi.mock('ioredis', () => {
  return {
    default: class Redis {
      setex(key: string, _ttl: number, value: string) {
        store.set(key, value);
        return Promise.resolve('OK');
      }

      get(key: string) {
        return Promise.resolve(store.get(key) ?? null);
      }
    },
  };
});

describe('tokenBlacklist', () => {
  const token = 'dummy.jwt.token';

  beforeEach(() => {
    store.clear();
  });

  it('ブラックリストに追加したトークンは検出される', async () => {
    await tokenBlacklist.add(token, 60);

    const result = await tokenBlacklist.isBlacklisted(token);
    expect(result).toBe(true);
  });

  it('追加していないトークンはブラックリストに含まれない', async () => {
    const result = await tokenBlacklist.isBlacklisted(token);
    expect(result).toBe(false);
  });

  it('異なるトークンは別物として扱われる', async () => {
    await tokenBlacklist.add(token, 60);

    const result = await tokenBlacklist.isBlacklisted('another.token');
    expect(result).toBe(false);
  });

  it('setex が正しい TTL で呼ばれる', async () => {
    const spy = vi.spyOn((await import('ioredis')).default.prototype, 'setex');

    await tokenBlacklist.add(token, 120);

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('blacklist:'), 120, '1');
  });
});
