import { renderHook } from '@testing-library/react';
import { useSubCategoryList } from './useSubCategoryList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories } from '@/features/subCategory';

// react-redux のモック
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// fetchSubCategories のモック
vi.mock('@/features/subCategory', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/subCategory')>();
  return {
    ...actual,
    fetchSubCategories: vi.fn(() => ({ type: 'subCategory/fetchAll' })),
  };
});

describe('useSubCategoryList', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it('データが空の場合、fetchSubCategories を dispatch すること', () => {
    vi.mocked(useSelector).mockReturnValue({ data: [], loading: false });

    renderHook(() => useSubCategoryList());

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(fetchSubCategories).toHaveBeenCalled();
  });

  it('データが存在する場合、fetchSubCategories を dispatch しないこと', () => {
    vi.mocked(useSelector).mockReturnValue({ 
      data: [{ subCategoryId: '1', subCategoryName: '11中隊' }], 
      loading: false 
    });

    renderHook(() => useSubCategoryList());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(fetchSubCategories).not.toHaveBeenCalled();
  });

  it('Reduxの状態（data, loading）を正しく返すこと', () => {
    const mockState = { data: [{ subCategoryId: '1', subCategoryName: '11中隊' }], loading: true };
    vi.mocked(useSelector).mockReturnValue(mockState);

    const { result } = renderHook(() => useSubCategoryList());

    expect(result.current.data).toEqual(mockState.data);
    expect(result.current.loading).toBe(true);
  });
});

