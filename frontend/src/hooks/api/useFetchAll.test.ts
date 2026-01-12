import { renderHook, act } from '@testing-library/react';
import { useFetchAll } from './useFetchAll';
import { describe, it, expect, vi } from 'vitest';
import { APIMESSAGE, type ApiMessageCode } from '@shared/apiMessage';

describe('useFetchAll', () => {
  it('全件取得を実行すると data が更新され、loading 状態が制御されること', async () => {
    const mockData = [{ id: '1' }, { id: '2' }];
    const code: ApiMessageCode = 'FETCH_SUCCESS';
    const mockFetchAllFn = vi.fn().mockResolvedValue({
      data: mockData,
      code,
      message: APIMESSAGE[code],
      status: 200,
    });

    const { result } = renderHook(() => useFetchAll(mockFetchAllFn));

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.fetchAll();
    });

    expect(mockFetchAllFn).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it('APIエラー時に loading が false に戻ること', async () => {
    const mockError = new Error('Fetch Error');
    const mockFetchAllFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useFetchAll(mockFetchAllFn));

    await expect(async () => {
      await act(async () => {
        await result.current.fetchAll();
      });
    }).rejects.toThrow('Fetch Error');

    expect(result.current.loading).toBe(false);
  });
});

