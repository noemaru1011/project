import { renderHook, act } from '@testing-library/react';
import { useSearch } from './useSearch';
import { describe, it, expect, vi } from 'vitest';

describe('useSearch', () => {
  it('検索を実行すると data が更新され、loading 状態が制御されること', async () => {
    const mockData = [{ id: '1', name: 'test' }];
    const mockSearchFn = vi.fn().mockResolvedValue({
      data: mockData,
      message: 'success',
      status: 200,
    });

    const { result } = renderHook(() => useSearch(mockSearchFn));

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);

    let searchPromise: any;
    await act(async () => {
      searchPromise = result.current.search('query');
    });

    const res = await searchPromise;

    expect(mockSearchFn).toHaveBeenCalledWith('query');
    expect(result.current.data).toEqual(mockData);
    expect(res.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it('APIエラー時に loading が false に戻り、エラーがスローされること', async () => {
    const mockError = new Error('API Error');
    const mockSearchFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useSearch(mockSearchFn));

    await expect(async () => {
      await act(async () => {
        await result.current.search('query');
      });
    }).rejects.toThrow('API Error');

    expect(result.current.loading).toBe(false);
  });
});

