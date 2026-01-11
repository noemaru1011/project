import { renderHook } from '@testing-library/react';
import { useSubCategoryOptions } from './useSubCategoryOptions';
import { describe, it, expect, vi } from 'vitest';
import { useSubCategoryList } from './useSubCategoryList';
import * as mapper from '@/features/subCategory/mapper';

// 依存する Hook とマッパーをモック化
vi.mock('./useSubCategoryList', () => ({
  useSubCategoryList: vi.fn(),
}));

vi.mock('@/features/subCategory/mapper', () => ({
  subCategoriesToOptions: vi.fn(),
}));

describe('useSubCategoryOptions', () => {
  it('useSubCategoryList から取得したデータをマッパーに渡し、その結果を返すこと', () => {
    const mockData = [{ subCategoryId: '1', subCategoryName: '11中隊' }];
    const mockOptions = [{ value: '1', label: '11中隊' }];
    
    vi.mocked(useSubCategoryList).mockReturnValue({ data: mockData, loading: false });
    vi.mocked(mapper.subCategoriesToOptions).mockReturnValue(mockOptions);

    const { result } = renderHook(() => useSubCategoryOptions());

    expect(mapper.subCategoriesToOptions).toHaveBeenCalledWith(mockData);
    expect(result.current.options).toEqual(mockOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useSubCategoryList).mockReturnValue({ data: [], loading: true });
    vi.mocked(mapper.subCategoriesToOptions).mockReturnValue([]);

    const { result } = renderHook(() => useSubCategoryOptions());

    expect(result.current.loading).toBe(true);
  });
});

