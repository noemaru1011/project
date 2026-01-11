import { describe, it, expect } from 'vitest';
import { categoriesToOptions } from './mapper';
import type { Category } from './types';

describe('category mapper', () => {
  it('Categoryの配列をOptionの配列に正しく変換すること', () => {
    const categories: Category[] = [
      { categoryId: '1', categoryName: '1大隊' },
      { categoryId: '2', categoryName: '2大隊' },
    ];

    const expected = [
      { value: '1', label: '1大隊' },
      { value: '2', label: '2大隊' },
    ];

    expect(categoriesToOptions(categories)).toEqual(expected);
  });

  it('空の配列を渡した場合、空の配列を返すこと', () => {
    expect(categoriesToOptions([])).toEqual([]);
  });
});
