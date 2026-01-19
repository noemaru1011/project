import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
  formatForDateTimeInput,
  getBaseDate,
  calculatePrevTime,
  calculateNextTime,
} from './dateUtils'; // 実際のファイルパスに合わせてください

describe('Date Utilities', () => {
  // システム時間のモック設定（getBaseDateのテストで重要）
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatForDateTimeInput', () => {
    it('Dateオブジェクトを YYYY-MM-DDTHH:mm 形式に変換する（ゼロ埋め確認）', () => {
      // Arrange
      // 2024年1月5日 9時5分 (1桁の月、日、時、分)
      const inputDate = new Date(2024, 0, 5, 9, 5);

      // Act
      const result = formatForDateTimeInput(inputDate);

      // Assert
      expect(result).toBe('2024-01-05T09:05');
    });

    it('2桁の月、日、時、分も正しく変換する', () => {
      // Arrange
      // 2024年12月31日 23時59分
      const inputDate = new Date(2024, 11, 31, 23, 59);

      // Act
      const result = formatForDateTimeInput(inputDate);

      // Assert
      expect(result).toBe('2024-12-31T23:59');
    });
  });

  describe('getBaseDate', () => {
    it('有効な日時文字列をDateオブジェクトに変換する', () => {
      // Arrange
      const inputStr = '2024-05-20T10:00';

      // Act
      const result = getBaseDate(inputStr);

      // Assert
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(4); // 5月
      expect(result.getHours()).toBe(10);
    });

    it('無効な文字列の場合、現在日時の13:00を返す', () => {
      // Arrange
      // 現在時刻を 2024-01-01 09:00 に固定
      const mockNow = new Date(2024, 0, 1, 9, 0);
      vi.setSystemTime(mockNow);
      const invalidStr = 'invalid-date-string';

      // Act
      const result = getBaseDate(invalidStr);

      // Assert
      // 固定した日付(1/1)の13:00になっているか確認
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(13);
      expect(result.getMinutes()).toBe(0);
    });
  });

  describe('calculatePrevTime', () => {
    // ロジック: h > 13 -> 13:00
    it('13時より後なら、同日の13:00に戻る', () => {
      // Arrange
      const current = '2024-01-10T15:30'; // 15時

      // Act
      const result = calculatePrevTime(current);

      // Assert
      expect(result).toBe('2024-01-10T13:00');
    });

    // ロジック: 13 >= h > 6 -> 06:00
    it('13時以下かつ6時より後なら、同日の06:00に戻る', () => {
      // Arrange
      const current = '2024-01-10T10:00'; // 10時

      // Act
      const result = calculatePrevTime(current);

      // Assert
      expect(result).toBe('2024-01-10T06:00');
    });

    it('ちょうど13時の場合も、06:00に戻る', () => {
      // Arrange
      // 条件式: if (h > 13) ... else if (h > 6) なので、13は else if に落ちる
      const current = '2024-01-10T13:00';

      // Act
      const result = calculatePrevTime(current);

      // Assert
      expect(result).toBe('2024-01-10T06:00');
    });

    // ロジック: それ以外 (h <= 6) -> 前日の22:00
    it('6時以下なら、前日の22:00に戻る', () => {
      // Arrange
      const current = '2024-01-10T05:00'; // 5時

      // Act
      const result = calculatePrevTime(current);

      // Assert
      expect(result).toBe('2024-01-09T22:00'); // 前日になっていること
    });

    it('ちょうど6時の場合も、前日の22:00に戻る', () => {
      // Arrange
      const current = '2024-01-10T06:00';

      // Act
      const result = calculatePrevTime(current);

      // Assert
      expect(result).toBe('2024-01-09T22:00');
    });
  });

  describe('calculateNextTime', () => {
    // ロジック: h < 6 -> 06:00
    it('6時より前なら、同日の06:00に進む', () => {
      // Arrange
      const current = '2024-01-10T04:00';

      // Act
      const result = calculateNextTime(current);

      // Assert
      expect(result).toBe('2024-01-10T06:00');
    });

    // ロジック: 6 <= h < 13 -> 13:00
    it('6時以降かつ13時より前なら、同日の13:00に進む', () => {
      // Arrange
      const current = '2024-01-10T09:00';

      // Act
      const result = calculateNextTime(current);

      // Assert
      expect(result).toBe('2024-01-10T13:00');
    });

    it('ちょうど6時の場合も、13:00に進む', () => {
      // Arrange
      const current = '2024-01-10T06:00';

      // Act
      const result = calculateNextTime(current);

      // Assert
      expect(result).toBe('2024-01-10T13:00');
    });

    // ロジック: 13 <= h < 22 -> 22:00
    it('13時以降かつ22時より前なら、同日の22:00に進む', () => {
      // Arrange
      const current = '2024-01-10T15:00';

      // Act
      const result = calculateNextTime(current);

      // Assert
      expect(result).toBe('2024-01-10T22:00');
    });

    // ロジック: それ以外 (h >= 22) -> 翌日の06:00
    it('22時以降なら、翌日の06:00に進む', () => {
      // Arrange
      const current = '2024-01-10T23:00';

      // Act
      const result = calculateNextTime(current);

      // Assert
      expect(result).toBe('2024-01-11T06:00'); // 翌日になっていること
    });

    it('ちょうど22時の場合も、翌日の06:00に進む', () => {
      // Arrange
      const current = '2024-01-10T22:00';

      // Act
      const result = calculateNextTime(current);

      // Assert
      expect(result).toBe('2024-01-11T06:00');
    });
  });
});
