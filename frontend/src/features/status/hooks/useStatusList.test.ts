import { renderHook } from '@testing-library/react';
import { useStatusList } from './useStatusList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatuses } from '@/features/status';

// react-redux のモック
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// fetchStatuses のモック
vi.mock('@/features/status', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/status')>();
  return {
    ...actual,
    fetchStatuses: vi.fn(() => ({ type: 'status/fetchAll' })),
  };
});

describe('useStatusList', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it('データが空の場合、fetchStatuses を dispatch すること', () => {
    vi.mocked(useSelector).mockReturnValue({ data: [], loading: false });

    renderHook(() => useStatusList());

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(fetchStatuses).toHaveBeenCalled();
  });

  it('データが存在する場合、fetchStatuses を dispatch しないこと', () => {
    vi.mocked(useSelector).mockReturnValue({ 
      data: [{ statusId: '1', statusName: '休務' }], 
      loading: false 
    });

    renderHook(() => useStatusList());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(fetchStatuses).not.toHaveBeenCalled();
  });

  it('Reduxの状態（data, loading）を正しく返すこと', () => {
    const mockState = { data: [{ statusId: '1', statusName: '休務' }], loading: true };
    vi.mocked(useSelector).mockReturnValue(mockState);

    const { result } = renderHook(() => useStatusList());

    expect(result.current.data).toEqual(mockState.data);
    expect(result.current.loading).toBe(true);
  });
});

