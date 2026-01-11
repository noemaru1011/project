import { renderHook } from '@testing-library/react';
import { useCategoryOptions } from './useCategoryOptions';
import { describe, it, expect, vi } from 'vitest';
import { useCategoryList } from './useCategoryList';

// useCategoryList のモック
vi.mock('./useCategoryList', () => ({
  useCategoryList: vi.fn(),
}));

describe('useCategoryOptions', () => {
  it('data を options に変換して返すこと', () => {
    const mockData = [
      { categoryId: '1', categoryName: '1大隊' },
      { categoryId: '2', categoryName: '2大隊' },
    ];
    vi.mocked(useCategoryList).mockReturnValue({ data: mockData, loading: false });

    const { result } = renderHook(() => useCategoryOptions());

    const expectedOptions = [
      { value: '1', label: '1大隊' },
      { value: '2', label: '2大隊' },
    ];

    expect(result.current.options).toEqual(expectedOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useCategoryList).mockReturnValue({ data: [], loading: true });

    const { result } = renderHook(() => useCategoryOptions());

    expect(result.current.options).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
