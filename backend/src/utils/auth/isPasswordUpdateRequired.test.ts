import { describe, it, expect, vi } from 'vitest';
import { isPasswordUpdateRequired } from './isPasswordUpdateRequired';

describe('isPasswordUpdateRequired', () => {
  const mockNow = new Date('2026-01-13T10:00:00Z');

  it('作成日時と更新日時が同じ場合、trueを返すこと（初回ログイン時）', () => {
    const createdAt = new Date('2026-01-13T10:00:00Z');
    const updatedAt = new Date('2026-01-13T10:00:00Z');
    
    expect(isPasswordUpdateRequired(createdAt, updatedAt)).toBe(true);
  });

  it('更新から30日以上経過している場合、trueを返すこと', () => {
    // 31日前
    const updatedAt = new Date(mockNow.getTime() - (1000 * 60 * 60 * 24 * 31));
    const createdAt = new Date(updatedAt.getTime() - 1000); // 作成日はさらに前

    // Dateをモック化して現在時刻を固定
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);

    expect(isPasswordUpdateRequired(createdAt, updatedAt)).toBe(true);

    vi.useRealTimers();
  });

  it('更新から30日以内の場合、falseを返すこと', () => {
    // 10日前
    const updatedAt = new Date(mockNow.getTime() - (1000 * 60 * 60 * 24 * 10));
    const createdAt = new Date(updatedAt.getTime() - 1000);

    vi.useFakeTimers();
    vi.setSystemTime(mockNow);

    expect(isPasswordUpdateRequired(createdAt, updatedAt)).toBe(false);

    vi.useRealTimers();
  });
});
