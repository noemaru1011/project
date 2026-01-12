import { renderHook, act } from '@testing-library/react';
import { useUpdate } from './useUpdate';
import { describe, it, expect, vi } from 'vitest';
import { APIMESSAGE, type ApiMessageCode } from '@shared/apiMessage';

describe('useUpdate', () => {
  it('更新を実行すると loading 状態が制御されること', async () => {
    const code: ApiMessageCode = 'UPDATE_SUCCESS';
    const mockUpdateFn = vi.fn().mockResolvedValue({
      data: null,
      code,
      message: APIMESSAGE[code],
      status: 200,
    });

    const { result } = renderHook(() => useUpdate(mockUpdateFn));

    expect(result.current.loading).toBe(false);

    let updatePromise: any;
    await act(async () => {
      updatePromise = result.current.update('1', { name: 'updated name' });
    });

    const res = await updatePromise;

    expect(mockUpdateFn).toHaveBeenCalledWith('1', { name: 'updated name' });
    expect(res.message).toBe(APIMESSAGE[code]);
    expect(result.current.loading).toBe(false);
  });

  it('APIエラー時に loading が false に戻り、エラーがスローされること', async () => {
    const mockError = new Error('Update Error');
    const mockUpdateFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useUpdate(mockUpdateFn));

    await expect(async () => {
      await act(async () => {
        await result.current.update('1', { name: 'test' });
      });
    }).rejects.toThrow('Update Error');

    expect(result.current.loading).toBe(false);
  });
});
