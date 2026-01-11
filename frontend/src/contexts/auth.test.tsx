import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from './authProvider';
import { useAuth } from './atchContext';
import Cookies from 'js-cookie';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import type { Role } from '@shared/types/role';

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('AuthContext & AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // js-cookie.get のオーバーロードを潰して string を返せるようにする
    const get = Cookies.get as unknown as Mock;
    get.mockReturnValue(undefined);
  });

  it('AuthProvider 配下でない場合、useAuth がエラーを投げること', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used inside AuthProvider');

    consoleSpy.mockRestore();
  });

  it('初期レンダリング時に Cookie からロールを復元すること', () => {
    (Cookies.get as unknown as Mock).mockReturnValue('ADMIN');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.role).toBe('ADMIN');
    expect(Cookies.get).toHaveBeenCalledWith('role');
  });

  it('setRole を呼ぶとロールが更新され、Cookie に保存されること', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.setRole('STUDENT' as Role);
    });

    expect(result.current.role).toBe('STUDENT');
    expect(Cookies.set).toHaveBeenCalledWith('role', 'STUDENT');
  });

  it('setRole(null) を呼ぶとロールがクリアされ、Cookie から削除されること', () => {
    (Cookies.get as unknown as Mock).mockReturnValue('ADMIN');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.setRole(null);
    });

    expect(result.current.role).toBe(null);
    expect(Cookies.remove).toHaveBeenCalledWith('role');
  });
});
