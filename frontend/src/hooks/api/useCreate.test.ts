import { renderHook, act } from '@testing-library/react';
import { useCreate } from './useCreate';
import { describe, it, expect, vi } from 'vitest';
import { APIMESSAGE } from '@shared/apiMessage';

describe('useCreate', () => {
  it('作成を実行すると loading 状態が制御されること', async () => {
    const mockCreateFn = vi.fn().mockResolvedValue({
      data: null,
      code: 'CREATE_SUCCESS',
      message: APIMESSAGE.CREATE_SUCCESS,
      status: 201,
    });

    const { result } = renderHook(() => useCreate(mockCreateFn));

    expect(result.current.loading).toBe(false);

    let createPromise: any;
    await act(async () => {
      createPromise = result.current.create({ name: 'new item' });
    });

    const res = await createPromise;

    expect(mockCreateFn).toHaveBeenCalledWith({ name: 'new item' });
    expect(res.message).toBe('success');
    expect(result.current.loading).toBe(false);
  });

  it('APIエラー時に loading が false に戻り、エラーがスローされること', async () => {
    const mockError = new Error('Create Error');
    const mockCreateFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreate(mockCreateFn));

    await expect(async () => {
      await act(async () => {
        await result.current.create({ name: 'test' });
      });
    }).rejects.toThrow('Create Error');

    expect(result.current.loading).toBe(false);
  });
});

