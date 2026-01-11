import { describe, it, expect } from 'vitest';
import { minorCategoriesToOptions } from './mapper';
import type { MinorCategory } from '@shared/types/minorCategory';

describe('minorCategory mapper', () => {
  it('MinorCategoryの配列をOptionの配列に正しく変換すること', () => {
    const minorCategories: MinorCategory[] = [
      { minorCategoryId: '1', minorCategoryName: '111小隊' },
      { minorCategoryId: '2', minorCategoryName: '112小隊' },
    ];

    const expected = [
      { value: '1', label: '111小隊' },
      { value: '2', label: '112小隊' },
    ];

    expect(minorCategoriesToOptions(minorCategories)).toEqual(expected);
  });

  it('空の配列を渡した場合、空の配列を返すこと', () => {
    expect(minorCategoriesToOptions([])).toEqual([]);
  });
});
