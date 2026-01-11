import { renderHook } from '@testing-library/react';
import { useMinorCategoryOptions } from './useMinorCategoryOptions';
import { describe, it, expect, vi } from 'vitest';
import { useMinorCategoryList } from './useMinorCategoryList';

// useMinorCategoryList のモック
vi.mock('./useMinorCategoryList', () => ({
  useMinorCategoryList: vi.fn(),
}));

describe('useMinorCategoryOptions', () => {
  it('data を options に変換して返すこと', () => {
    const mockData = [
      { minorCategoryId: '1', minorCategoryName: '111小隊' },
      { minorCategoryId: '2', minorCategoryName: '112小隊' },
    ];
    vi.mocked(useMinorCategoryList).mockReturnValue({ data: mockData, loading: false });

    const { result } = renderHook(() => useMinorCategoryOptions());

    const expectedOptions = [
      { value: '1', label: '111小隊' },
      { value: '2', label: '112小隊' },
    ];

    expect(result.current.options).toEqual(expectedOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useMinorCategoryList).mockReturnValue({ data: [], loading: true });

    const { result } = renderHook(() => useMinorCategoryOptions());

    expect(result.current.options).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
