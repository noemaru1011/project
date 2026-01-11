import { renderHook, act } from '@testing-library/react';
import { useLogout } from './useLogout';
import { describe, it, expect, vi } from 'vitest';
import { authApi } from '@/features/auth/api';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import { useAuth } from '@/contexts/atchContext';

// モックの設定
vi.mock('@/features/auth/api', () => ({
  authApi: {
    logout: vi.fn(),
  },
}));

vi.mock('@/hooks/ux/useLoadingCounter', () => ({
  useLoadingCounter: vi.fn(),
}));

vi.mock('@/contexts/atchContext', () => ({
  useAuth: vi.fn(),
}));

describe('useLogout', () => {
  const mockStart = vi.fn();
  const mockEnd = vi.fn();
  const mockSetRole = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLoadingCounter).mockReturnValue({
      loading: false,
      start: mockStart,
      end: mockEnd,
    });
    vi.mocked(useAuth).mockReturnValue({
      role: 'ADMIN',
      setRole: mockSetRole,
    });
  });

  it('ログアウトに成功したとき、ローディング状態が管理され、role が null になること', async () => {
    const mockResponse = { status: 200, code: 'SUCCESS', message: 'Logout successful' };
    vi.mocked(authApi.logout).mockResolvedValue(mockResponse as any);

    const { result } = renderHook(() => useLogout());

    let res;
    await act(async () => {
      res = await result.current.logout();
    });

    expect(mockStart).toHaveBeenCalled();
    expect(authApi.logout).toHaveBeenCalled();
    expect(mockSetRole).toHaveBeenCalledWith(null);
    expect(res).toEqual(mockResponse);
    expect(mockEnd).toHaveBeenCalled();
  });

  it('ログアウトに失敗したときでも、ローディングが終了すること', async () => {
    vi.mocked(authApi.logout).mockRejectedValue(new Error('Logout failed'));

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      try {
        await result.current.logout();
      } catch (e) {
        // ignore
      }
    });

    expect(mockStart).toHaveBeenCalled();
    expect(mockEnd).toHaveBeenCalled();
  });
});
