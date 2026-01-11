import { renderHook } from '@testing-library/react';
import { useStatusOptions } from './useStatusOptions';
import { describe, it, expect, vi } from 'vitest';
import { useStatusList } from './useStatusList';
import * as mapper from '@/features/status/mapper';

// 依存する Hook とマッパーをモック化
vi.mock('./useStatusList', () => ({
  useStatusList: vi.fn(),
}));

vi.mock('@/features/status/mapper', () => ({
  statusesToOptions: vi.fn(),
}));

describe('useStatusOptions', () => {
  it('useStatusList から取得したデータをマッパーに渡し、その結果を返すこと', () => {
    const mockData = [{ statusId: '1', statusName: '休務' }];
    const mockOptions = [{ value: '1', label: '休務' }];
    
    vi.mocked(useStatusList).mockReturnValue({ data: mockData, loading: false });
    vi.mocked(mapper.statusesToOptions).mockReturnValue(mockOptions);

    const { result } = renderHook(() => useStatusOptions());

    expect(mapper.statusesToOptions).toHaveBeenCalledWith(mockData);
    expect(result.current.options).toEqual(mockOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useStatusList).mockReturnValue({ data: [], loading: true });
    vi.mocked(mapper.statusesToOptions).mockReturnValue([]);

    const { result } = renderHook(() => useStatusOptions());

    expect(result.current.loading).toBe(true);
  });
});
