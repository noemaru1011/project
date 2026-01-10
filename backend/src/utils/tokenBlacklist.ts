import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error('REDIS_URL is not defined');
}

export const redis = new Redis(redisUrl);

export const tokenBlacklist = {
  // ログアウト時にトークンをブラックリストに追加
  async add(token: string, expiresIn: number) {
    // トークンの残り有効期限だけ保持（自動削除）
    await redis.setex(`blacklist:${token}`, expiresIn, '1');
  },

  // 認証時にブラックリストチェック
  async isBlacklisted(token: string): Promise<boolean> {
    const result = await redis.get(`blacklist:${token}`);
    return result !== null;
  },
};
