import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
    env: {
      REDIS_URL: 'redis://localhost:6379',
      JWT_SECRET: 'test-secret',
    },
  },
});
