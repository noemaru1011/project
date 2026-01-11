import { describe, it, expect } from 'vitest';
import { statusesToOptions } from './mapper';
import type { Status } from '@shared/types/status';

describe('status mapper', () => {
  it('Statusの配列をOptionの配列に正しく変換すること', () => {
    const statuses: Status[] = [
      { statusId: '1', statusName: '休務' },
      { statusId: '2', statusName: '平日外出' },
    ];

    const expected = [
      { value: '1', label: '休務' },
      { value: '2', label: '平日外出' },
    ];

    expect(statusesToOptions(statuses)).toEqual(expected);
  });

  it('空の配列を渡した場合、空の配列を返すこと', () => {
    expect(statusesToOptions([])).toEqual([]);
  });
});
