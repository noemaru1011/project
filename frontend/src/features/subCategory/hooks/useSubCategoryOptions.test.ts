import { renderHook } from '@testing-library/react';
import { useSubCategoryOptions } from './useSubCategoryOptions';
import { describe, it, expect, vi } from 'vitest';
import { useSubCategoryList } from './useSubCategoryList';

// useSubCategoryList のモック
vi.mock('./useSubCategoryList', () => ({
  useSubCategoryList: vi.fn(),
}));

describe('useSubCategoryOptions', () => {
  it('data を options に変換して返すこと', () => {
    const mockData = [
      { subCategoryId: '1', subCategoryName: '11中隊' },
      { subCategoryId: '2', subCategoryName: '12中隊' },
    ];
    vi.mocked(useSubCategoryList).mockReturnValue({ data: mockData, loading: false });

    const { result } = renderHook(() => useSubCategoryOptions());

    const expectedOptions = [
      { value: '1', label: '11中隊' },
      { value: '2', label: '12中隊' },
    ];

    expect(result.current.options).toEqual(expectedOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useSubCategoryList).mockReturnValue({ data: [], loading: true });

    const { result } = renderHook(() => useSubCategoryOptions());

    expect(result.current.options).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});

