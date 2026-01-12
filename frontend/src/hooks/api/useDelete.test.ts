import { renderHook, act } from '@testing-library/react';
import { useDelete } from './useDelete';
import { describe, it, expect, vi } from 'vitest';
import { APIMESSAGE } from '@shared/apiMessage';

describe('useDelete', () => {
  it('削除を実行すると loading 状態が制御されること', async () => {
    const mockDeleteFn = vi.fn().mockResolvedValue({
      data: null,
      code: 'DELETE_SUCCESS',
      message: APIMESSAGE.DELETE_SUCCESS,
      status: 200,
    });

    const { result } = renderHook(() => useDelete(mockDeleteFn));

    expect(result.current.loading).toBe(false);

    let deletePromise: any;
    await act(async () => {
      deletePromise = result.current.remove('1');
    });

    const res = await deletePromise;

    expect(mockDeleteFn).toHaveBeenCalledWith('1');
    expect(res.message).toBe('deleted');
    expect(result.current.loading).toBe(false);
  });

  it('APIエラー時に loading が false に戻り、エラーがスローされること', async () => {
    const mockError = new Error('Delete Error');
    const mockDeleteFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useDelete(mockDeleteFn));

    await expect(async () => {
      await act(async () => {
        await result.current.remove('1');
      });
    }).rejects.toThrow('Delete Error');

    expect(result.current.loading).toBe(false);
  });
});

