import { renderHook, act } from '@testing-library/react';
import { useLogin } from './useLogin';
import { describe, it, expect, vi } from 'vitest';
import { authApi } from '@/features/auth/api';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/atchContext';
import { APIMESSAGE, type ApiMessageCode } from '@shared/constants/apiMessage';

// モックの設定
vi.mock('@/features/auth/api', () => ({
  authApi: {
    login: vi.fn(),
  },
}));

vi.mock('@/hooks/ux/useLoadingCounter', () => ({
  useLoadingCounter: vi.fn(),
}));

vi.mock('@/contexts/passwordUpdateContext', () => ({
  usePasswordUpdateContext: vi.fn(),
}));

vi.mock('@/contexts/atchContext', () => ({
  useAuth: vi.fn(),
}));

describe('useLogin', () => {
  const mockStart = vi.fn();
  const mockEnd = vi.fn();
  const mockSetPasswordUpdateRequired = vi.fn();
  const mockSetRole = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLoadingCounter).mockReturnValue({
      loading: false,
      start: mockStart,
      end: mockEnd,
    });
    vi.mocked(usePasswordUpdateContext).mockReturnValue({
      setPasswordUpdateRequired: mockSetPasswordUpdateRequired,
      passwordUpdateRequired: false,
    });
    vi.mocked(useAuth).mockReturnValue({
      role: null,
      setRole: mockSetRole,
    });
  });

  it('ログインに成功したとき、ローディング状態が管理され、role とパスワード更新フラグが更新されること', async () => {
    const code: ApiMessageCode = 'LOGIN_SUCCESS';
    const mockResponse = {
      status: 200,
      code,
      message: APIMESSAGE[code],
      data: {
        role: 'ADMIN',
        passwordUpdateRequired: true,
      },
    };
    vi.mocked(authApi.login).mockResolvedValue(mockResponse as any);

    const { result } = renderHook(() => useLogin());

    let res;
    await act(async () => {
      res = await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(mockStart).toHaveBeenCalled();
    expect(authApi.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(mockSetPasswordUpdateRequired).toHaveBeenCalledWith(true);
    expect(mockSetRole).toHaveBeenCalledWith('ADMIN');
    expect(res).toEqual(mockResponse);
    expect(mockEnd).toHaveBeenCalled();
  });

  it('ログインに失敗したときでも、ローディングが終了すること', async () => {
    vi.mocked(authApi.login).mockRejectedValue(new Error('Login failed'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login({ email: 'test@example.com', password: 'password' });
      } catch (e) {
        // ignore
      }
    });

    expect(mockStart).toHaveBeenCalled();
    expect(mockEnd).toHaveBeenCalled();
  });
});
