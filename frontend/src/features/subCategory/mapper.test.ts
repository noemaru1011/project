import { describe, it, expect } from 'vitest';
import { subCategoriesToOptions } from './mapper';
import type { SubCategory } from '@shared/types/subCategory';

describe('subCategory mapper', () => {
  it('SubCategoryの配列をOptionの配列に正しく変換すること', () => {
    const subCategories: SubCategory[] = [
      { subCategoryId: '1', subCategoryName: '11中隊' },
      { subCategoryId: '2', subCategoryName: '12中隊' },
    ];

    const expected = [
      { value: '1', label: '11中隊' },
      { value: '2', label: '12中隊' },
    ];

    expect(subCategoriesToOptions(subCategories)).toEqual(expected);
  });

  it('空の配列を渡した場合、空の配列を返すこと', () => {
    expect(subCategoriesToOptions([])).toEqual([]);
  });
});
