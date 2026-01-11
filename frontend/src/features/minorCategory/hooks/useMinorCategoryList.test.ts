import { renderHook } from '@testing-library/react';
import { useMinorCategoryList } from './useMinorCategoryList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMinorCategories } from '@/features/minorCategory';

// react-redux のモック
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// fetchMinorCategories のモック
vi.mock('@/features/minorCategory', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/minorCategory')>();
  return {
    ...actual,
    fetchMinorCategories: vi.fn(() => ({ type: 'minorCategory/fetchAll' })),
  };
});

describe('useMinorCategoryList', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it('データが空の場合、fetchMinorCategories を dispatch すること', () => {
    vi.mocked(useSelector).mockReturnValue({ data: [], loading: false });

    renderHook(() => useMinorCategoryList());

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(fetchMinorCategories).toHaveBeenCalled();
  });

  it('データが存在する場合、fetchMinorCategories を dispatch しないこと', () => {
    vi.mocked(useSelector).mockReturnValue({ 
      data: [{ minorCategoryId: '1', minorCategoryName: '111小隊' }], 
      loading: false 
    });

    renderHook(() => useMinorCategoryList());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(fetchMinorCategories).not.toHaveBeenCalled();
  });

  it('Reduxの状態（data, loading）を正しく返すこと', () => {
    const mockState = { data: [{ minorCategoryId: '1', minorCategoryName: '111小隊' }], loading: true };
    vi.mocked(useSelector).mockReturnValue(mockState);

    const { result } = renderHook(() => useMinorCategoryList());

    expect(result.current.data).toEqual(mockState.data);
    expect(result.current.loading).toBe(true);
  });
});

