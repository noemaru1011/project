import { renderHook, act } from '@testing-library/react';
import { useView } from './useView';
import { describe, it, expect, vi } from 'vitest';
import { APIMESSAGE, type ApiMessageCode } from '@shared/constants/apiMessage';

describe('useView', () => {
  it('詳細取得を実行するとデータが返され、loading 状態が制御されること', async () => {
    const mockData = { id: '1', name: 'item' };
    const code: ApiMessageCode = 'FETCH_SUCCESS';
    const mockViewFn = vi.fn().mockResolvedValue({
      data: mockData,
      code,
      message: APIMESSAGE[code],
      status: 200,
    });

    const { result } = renderHook(() => useView(mockViewFn));

    expect(result.current.loading).toBe(false);

    let viewPromise: any;
    await act(async () => {
      viewPromise = result.current.view('1');
    });

    const data = await viewPromise;

    expect(mockViewFn).toHaveBeenCalledWith('1');
    expect(data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it('APIエラー時に loading が false に戻り、エラーがスローされること', async () => {
    const mockError = new Error('View Error');
    const mockViewFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useView(mockViewFn));

    await expect(async () => {
      await act(async () => {
        await result.current.view('1');
      });
    }).rejects.toThrow('View Error');

    expect(result.current.loading).toBe(false);
  });
});
