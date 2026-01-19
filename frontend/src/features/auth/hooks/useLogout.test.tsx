import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLogout } from './useLogout';
import { authApi } from '@/features/auth/api';
import { useAuth } from '@/contexts/auchContext';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';

// 1. 各モックの定義
vi.mock('@/features/auth/api', () => ({
  authApi: { logout: vi.fn() },
}));

vi.mock('@/contexts/atchContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/contexts/passwordUpdateContext', () => ({
  usePasswordUpdateContext: vi.fn(),
}));

describe('useLogout', () => {
  const mockSetRole = vi.fn();
  const mockSetPasswordUpdateRequired = vi.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    // Contextのモック戻り値を設定
    (useAuth as any).mockReturnValue({ setRole: mockSetRole });
    (usePasswordUpdateContext as any).mockReturnValue({
      setPasswordUpdateRequired: mockSetPasswordUpdateRequired,
    });

    // テストごとにクリーンなQueryClientを作成
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });

    // queryClient.clear を監視（スパイ）する
    vi.spyOn(queryClient, 'clear');
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('ログアウト成功時、すべての状態がリセットされること', async () => {
    // APIが成功を返すように設定
    (authApi.logout as any).mockResolvedValue({ message: 'Logout successful' });

    const { result } = renderHook(() => useLogout(), { wrapper });

    // ログアウト実行
    await result.current.logout();

    // 観点1: APIが正しく呼ばれたか
    expect(authApi.logout).toHaveBeenCalledTimes(1);

    // 観点2: Contextの状態がリセット（null/false）されたか
    expect(mockSetRole).toHaveBeenCalledWith(null);
    expect(mockSetPasswordUpdateRequired).toHaveBeenCalledWith(false);

    // 観点3: 重要！キャッシュが全削除されたか
    expect(queryClient.clear).toHaveBeenCalled();
  });

  it('APIがエラーになっても壊れないこと', async () => {
    (authApi.logout as any).mockRejectedValue(new Error('Logout Failed'));

    const { result } = renderHook(() => useLogout(), { wrapper });

    // エラーが投げられることを確認
    await expect(result.current.logout()).rejects.toThrow('Logout Failed');

    // エラー時は副作用（クリア処理）が実行されないことを確認（設計によりますが、今回は成功時のみクリアにしています）
    expect(mockSetRole).not.toHaveBeenCalled();
    expect(queryClient.clear).not.toHaveBeenCalled();
  });
});
