import Redis from 'ioredis';
import crypto from 'crypto';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error('REDIS_URL is not defined');
}

export const redis = new Redis(redisUrl);

function tokenHash(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export const tokenBlacklist = {
  // ログアウト時にトークンをブラックリストに追加
  async add(token: string, expiresIn: number): Promise<void> {
    const key = `blacklist:${tokenHash(token)}`;
    await redis.setex(key, expiresIn, '1');
  },

  // 認証時にブラックリストチェック
  async isBlacklisted(token: string): Promise<boolean> {
    const key = `blacklist:${tokenHash(token)}`;
    const result = await redis.get(key);
    return result !== null;
  },
};
