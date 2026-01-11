import { renderHook, act } from '@testing-library/react';
import { useLoadingCounter } from './useLoadingCounter';
import { describe, it, expect } from 'vitest';

describe('useLoadingCounter', () => {
  it('初期状態は loading が false であること', () => {
    const { result } = renderHook(() => useLoadingCounter());
    expect(result.current.loading).toBe(false);
  });

  it('start を呼ぶと loading が true になること', () => {
    const { result } = renderHook(() => useLoadingCounter());
    act(() => {
      result.current.start();
    });
    expect(result.current.loading).toBe(true);
  });

  it('複数回 start を呼んでも、end を同数呼ぶまで loading が true であること', () => {
    const { result } = renderHook(() => useLoadingCounter());
    act(() => {
      result.current.start();
      result.current.start();
    });
    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.end();
    });
    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.end();
    });
    expect(result.current.loading).toBe(false);
  });

  it('loadingCount が 0 未満にならないこと', () => {
    const { result } = renderHook(() => useLoadingCounter());
    act(() => {
      result.current.end();
    });
    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.start();
    });
    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.end();
    });
    expect(result.current.loading).toBe(false);
  });
});

