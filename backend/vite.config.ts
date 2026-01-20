import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'], // Vitest が読む対象を制限
    environment: 'node',
    watch: false,
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
    env: {
      REDIS_URL: 'redis://localhost:6379',
      JWT_SECRET: 'test-secret',
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5433/postgres?schema=public',
    },
  },
});
