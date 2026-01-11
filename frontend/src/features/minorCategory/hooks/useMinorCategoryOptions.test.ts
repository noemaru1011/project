import { renderHook } from '@testing-library/react';
import { useMinorCategoryOptions } from './useMinorCategoryOptions';
import { describe, it, expect, vi } from 'vitest';
import { useMinorCategoryList } from './useMinorCategoryList';
import * as mapper from '@/features/minorCategory/mapper';

// 依存する Hook とマッパーをモック化
vi.mock('./useMinorCategoryList', () => ({
  useMinorCategoryList: vi.fn(),
}));

vi.mock('@/features/minorCategory/mapper', () => ({
  minorCategoriesToOptions: vi.fn(),
}));

describe('useMinorCategoryOptions', () => {
  it('useMinorCategoryList から取得したデータをマッパーに渡し、その結果を返すこと', () => {
    const mockData = [{ minorCategoryId: '1', minorCategoryName: '111小隊' }];
    const mockOptions = [{ value: '1', label: '111小隊' }];
    
    vi.mocked(useMinorCategoryList).mockReturnValue({ data: mockData, loading: false });
    vi.mocked(mapper.minorCategoriesToOptions).mockReturnValue(mockOptions);

    const { result } = renderHook(() => useMinorCategoryOptions());

    expect(mapper.minorCategoriesToOptions).toHaveBeenCalledWith(mockData);
    expect(result.current.options).toEqual(mockOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useMinorCategoryList).mockReturnValue({ data: [], loading: true });
    vi.mocked(mapper.minorCategoriesToOptions).mockReturnValue([]);

    const { result } = renderHook(() => useMinorCategoryOptions());

    expect(result.current.loading).toBe(true);
  });
});
