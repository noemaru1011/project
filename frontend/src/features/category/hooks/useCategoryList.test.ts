import { renderHook } from '@testing-library/react';
import { useCategoryList } from './useCategoryList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/features/category';

// react-redux のモック
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// fetchCategories のモック
vi.mock('@/features/category', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/category')>();
  return {
    ...actual,
    fetchCategories: vi.fn(() => ({ type: 'category/fetchAll' })),
  };
});

describe('useCategoryList', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it('データが空の場合、fetchCategories を dispatch すること', () => {
    vi.mocked(useSelector).mockReturnValue({ data: [], loading: false });

    renderHook(() => useCategoryList());

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(fetchCategories).toHaveBeenCalled();
  });

  it('データが存在する場合、fetchCategories を dispatch しないこと', () => {
    vi.mocked(useSelector).mockReturnValue({ 
      data: [{ categoryId: 1, categoryName: '1大隊' }], 
      loading: false 
    });

    renderHook(() => useCategoryList());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(fetchCategories).not.toHaveBeenCalled();
  });

  it('Reduxの状態（data, loading）を正しく返すこと', () => {
    const mockState = { data: [{ categoryId: 1, categoryName: '1大隊' }], loading: true };
    vi.mocked(useSelector).mockReturnValue(mockState);

    const { result } = renderHook(() => useCategoryList());

    expect(result.current.data).toEqual(mockState.data);
    expect(result.current.loading).toBe(true);
  });
});

