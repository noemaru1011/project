import { renderHook, act } from '@testing-library/react';
import { PasswordUpdateProvider } from './passwordUpdateProvider';
import { usePasswordUpdateContext } from './passwordUpdateContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('PasswordUpdateContext & PasswordUpdateProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('PasswordUpdateProvider 配下でない場合、usePasswordUpdateContext がエラーを投げること', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => usePasswordUpdateContext())).toThrow(
      'usePasswordUpdateContext must be used within a PasswordUpdateProvider',
    );

    consoleSpy.mockRestore();
  });

  it('初期レンダリング時に localStorage から状態を復元すること', () => {
    localStorage.setItem('passwordUpdateRequired', 'true');

    const { result } = renderHook(() => usePasswordUpdateContext(), {
      wrapper: PasswordUpdateProvider,
    });

    expect(result.current.passwordUpdateRequired).toBe(true);
  });

  it('setPasswordUpdateRequired を呼ぶと状態が更新され、localStorage に保存されること', () => {
    const { result } = renderHook(() => usePasswordUpdateContext(), {
      wrapper: PasswordUpdateProvider,
    });

    act(() => {
      result.current.setPasswordUpdateRequired(true);
    });

    expect(result.current.passwordUpdateRequired).toBe(true);
    expect(localStorage.getItem('passwordUpdateRequired')).toBe('true');

    act(() => {
      result.current.setPasswordUpdateRequired(false);
    });

    expect(result.current.passwordUpdateRequired).toBe(false);
    expect(localStorage.getItem('passwordUpdateRequired')).toBe('false');
  });
});
