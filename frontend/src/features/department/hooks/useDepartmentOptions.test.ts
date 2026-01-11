import { renderHook } from '@testing-library/react';
import { useDepartmentOptions } from './useDepartmentOptions';
import { describe, it, expect, vi } from 'vitest';
import { useDepartmentList } from './useDepartmentList';
import * as mapper from '@/features/department/mapper';

// 依存する Hook とマッパーをモック化
vi.mock('./useDepartmentList', () => ({
  useDepartmentList: vi.fn(),
}));

vi.mock('@/features/department/mapper', () => ({
  departmentsToOptions: vi.fn(),
}));

describe('useDepartmentOptions', () => {
  it('useDepartmentList から取得したデータをマッパーに渡し、その結果を返すこと', () => {
    const mockData = [{ departmentId: '1', departmentName: '経済学部' }];
    const mockOptions = [{ value: '1', label: '経済学部' }];
    
    vi.mocked(useDepartmentList).mockReturnValue({ data: mockData, loading: false });
    vi.mocked(mapper.departmentsToOptions).mockReturnValue(mockOptions);

    const { result } = renderHook(() => useDepartmentOptions());

    expect(mapper.departmentsToOptions).toHaveBeenCalledWith(mockData);
    expect(result.current.options).toEqual(mockOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useDepartmentList).mockReturnValue({ data: [], loading: true });
    vi.mocked(mapper.departmentsToOptions).mockReturnValue([]);

    const { result } = renderHook(() => useDepartmentOptions());

    expect(result.current.loading).toBe(true);
  });
});
