import { renderHook } from '@testing-library/react';
import { useStatusOptions } from './useStatusOptions';
import { describe, it, expect, vi } from 'vitest';
import { useStatusList } from './useStatusList';

// useStatusList のモック
vi.mock('./useStatusList', () => ({
  useStatusList: vi.fn(),
}));

describe('useStatusOptions', () => {
  it('data を options に変換して返すこと', () => {
    const mockData = [
      { statusId: '1', statusName: '休務' },
      { statusId: '2', statusName: '平日外出' },
    ];
    vi.mocked(useStatusList).mockReturnValue({ data: mockData, loading: false });

    const { result } = renderHook(() => useStatusOptions());

    const expectedOptions = [
      { value: '1', label: '休務' },
      { value: '2', label: '平日外出' },
    ];

    expect(result.current.options).toEqual(expectedOptions);
    expect(result.current.loading).toBe(false);
  });

  it('loading 状態を正しく反映すること', () => {
    vi.mocked(useStatusList).mockReturnValue({ data: [], loading: true });

    const { result } = renderHook(() => useStatusOptions());

    expect(result.current.options).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
