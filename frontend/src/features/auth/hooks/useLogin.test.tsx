import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLogin } from './useLogin';
import { authApi } from '@/features/auth/api';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/atchContext';

// 1. 各モックの定義
vi.mock('@/features/auth/api', () => ({
  authApi: {
    login: vi.fn(),
  },
}));

vi.mock('@/contexts/passwordUpdateContext', () => ({
  usePasswordUpdateContext: vi.fn(),
}));

vi.mock('@/contexts/atchContext', () => ({
  useAuth: vi.fn(),
}));

describe('useLogin', () => {
  // Contextを操作するためのモック関数
  const mockSetPasswordUpdateRequired = vi.fn();
  const mockSetRole = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Contextの戻り値を設定
    (usePasswordUpdateContext as any).mockReturnValue({
      setPasswordUpdateRequired: mockSetPasswordUpdateRequired,
    });
    (useAuth as any).mockReturnValue({
      setRole: mockSetRole,
    });
  });

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  it('ログイン成功時、Contextが更新されること', async () => {
    // APIのレスポンスをシミュレート
    const mockResponse = {
      data: {
        passwordUpdateRequired: true,
        role: 'admin',
      },
    };
    (authApi.login as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // ログイン実行
    const loginData = { email: 'test@example.com', password: 'password123' };

    // mutateAsyncを呼ぶ（awaitで完了を待てる）
    await result.current.login(loginData);

    // 観点1: APIが呼ばれたか
    expect(authApi.login).toHaveBeenCalledWith(loginData);

    // 観点2: Contextが正しい値で更新されたか
    expect(mockSetPasswordUpdateRequired).toHaveBeenCalledWith(true);
    expect(mockSetRole).toHaveBeenCalledWith('admin');
  });

  it('APIエラー時でも壊れないこと', async () => {
    (authApi.login as any).mockRejectedValue(new Error('Login Failed'));

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // mutateAsyncはエラー時に例外を投げるので、catchするか拒否されることを確認する
    await expect(result.current.login({ email: 'a', password: 'b' })).rejects.toThrow(
      'Login Failed',
    );

    // エラー時はContextが呼ばれないこと
    expect(mockSetRole).not.toHaveBeenCalled();
  });
});
