import { renderHook } from '@testing-library/react';
import { useCategoryOptions } from './useCategoryOptions';
import { describe, it, expect, vi } from 'vitest';
import { useCategoryList } from './useCategoryList';
import * as mapper from '@/features/category/mapper';

// 依存する Hook とマッパーをモック化
vi.mock('./useCategoryList', () => ({
  useCategoryList: vi.fn(),
}));

vi.mock('@/features/category/mapper', () => ({
  categoriesToOptions: vi.fn(),
}));

describe('useCategoryOptions', () => {
  it('useCategoryList から取得したデータをマッパーに渡し、その結果を返すこと', () => {
    const mockData = [{ categoryId: '1', categoryName: '1大隊' }];
    const mockOptions = [{ value: '1', label: '1大隊' }];
    
    // それぞれの戻り値を設定
    vi.mocked(useCategoryList).mockReturnValue({ data: mockData, loading: false });
    vi.mocked(mapper.categoriesToOptions).mockReturnValue(mockOptions);

    const { result } = renderHook(() => useCategoryOptions());

    // マッパーが正しい引数で呼ばれたか検証
    expect(mapper.categoriesToOptions).toHaveBeenCalledWith(mockData);
    // Hook がマッパーの戻り値をそのまま返しているか検証
    expect(result.current.options).toEqual(mockOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useCategoryList).mockReturnValue({ data: [], loading: true });
    vi.mocked(mapper.categoriesToOptions).mockReturnValue([]);

    const { result } = renderHook(() => useCategoryOptions());

    expect(result.current.loading).toBe(true);
  });
});
