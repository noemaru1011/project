import { describe, it, expect } from 'vitest';
import { formatDateTime } from './formatDateTime';

describe('formatDateTime', () => {
  it('null のとき null を返す', () => {
    expect(formatDateTime(null)).toBeNull();
  });

  it('通常の日時を YYYY-MM-DD HH:mm に変換する', () => {
    const d = new Date(2026, 0, 15, 14, 7); // 2026-01-15 14:07

    expect(formatDateTime(d)).toBe('2026-01-15 14:07');
  });

  it('月・日・時・分が1桁でも0埋めされる', () => {
    const d = new Date(2026, 8, 3, 4, 5); // 2026-09-03 04:05

    expect(formatDateTime(d)).toBe('2026-09-03 04:05');
  });

  it('年末日付も正しく変換できる', () => {
    const d = new Date(2026, 11, 31, 23, 59); // 2026-12-31 23:59

    expect(formatDateTime(d)).toBe('2026-12-31 23:59');
  });
});
