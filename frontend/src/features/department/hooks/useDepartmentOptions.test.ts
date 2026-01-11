import { renderHook } from '@testing-library/react';
import { useDepartmentOptions } from './useDepartmentOptions';
import { describe, it, expect, vi } from 'vitest';
import { useDepartmentList } from './useDepartmentList';

// useDepartmentList のモック
vi.mock('./useDepartmentList', () => ({
  useDepartmentList: vi.fn(),
}));

describe('useDepartmentOptions', () => {
  it('data を options に変換して返すこと', () => {
    const mockData = [
      { departmentId: '1', departmentName: '経済学部' },
      { departmentId: '2', departmentName: '法学部' },
    ];
    vi.mocked(useDepartmentList).mockReturnValue({ data: mockData, loading: false });

    const { result } = renderHook(() => useDepartmentOptions());

    const expectedOptions = [
      { value: '1', label: '経済学部' },
      { value: '2', label: '法学部' },
    ];

    expect(result.current.options).toEqual(expectedOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useDepartmentList).mockReturnValue({ data: [], loading: true });

    const { result } = renderHook(() => useDepartmentOptions());

    expect(result.current.options).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
