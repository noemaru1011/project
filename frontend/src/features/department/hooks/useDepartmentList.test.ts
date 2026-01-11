import { renderHook } from '@testing-library/react';
import { useDepartmentList } from './useDepartmentList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '@/features/department';

// react-redux のモック
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// fetchDepartments のモック
vi.mock('@/features/department', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/department')>();
  return {
    ...actual,
    fetchDepartments: vi.fn(() => ({ type: 'department/fetchAll' })),
  };
});

describe('useDepartmentList', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it('データが空の場合、fetchDepartments を dispatch すること', () => {
    vi.mocked(useSelector).mockReturnValue({ data: [], loading: false });

    renderHook(() => useDepartmentList());

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(fetchDepartments).toHaveBeenCalled();
  });

  it('データが存在する場合、fetchDepartments を dispatch しないこと', () => {
    vi.mocked(useSelector).mockReturnValue({ 
      data: [{ departmentId: '1', departmentName: '経済学部' }], 
      loading: false 
    });

    renderHook(() => useDepartmentList());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(fetchDepartments).not.toHaveBeenCalled();
  });

  it('Reduxの状態（data, loading）を正しく返すこと', () => {
    const mockState = { data: [{ departmentId: '1', departmentName: '経済学部' }], loading: true };
    vi.mocked(useSelector).mockReturnValue(mockState);

    const { result } = renderHook(() => useDepartmentList());

    expect(result.current.data).toEqual(mockState.data);
    expect(result.current.loading).toBe(true);
  });
});

