import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useUpdatePassword } from './useUpdatePassword';
import { authApi } from '@/features/auth/api';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';

// モック定義
vi.mock('@/features/auth/api', () => ({
  authApi: { updatePassword: vi.fn() },
}));

vi.mock('@/contexts/passwordUpdateContext', () => ({
  usePasswordUpdateContext: vi.fn(),
}));

describe('usePassword', () => {
  const mockSetPasswordUpdateRequired = vi.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    (usePasswordUpdateContext as any).mockReturnValue({
      setPasswordUpdateRequired: mockSetPasswordUpdateRequired,
    });

    queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false } },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('パスワード更新成功時、Contextのフラグがfalseに更新されること', async () => {
    // API成功のシミュレート
    (authApi.updatePassword as any).mockResolvedValue({ message: 'Success' });

    const { result } = renderHook(() => useUpdatePassword(), { wrapper });

    const input = { oldPassword: 'old', newPassword: 'new', checkNewPassword: 'new' };
    await result.current.update(input);

    // 観点1: APIが正しいデータで呼ばれたか
    expect(authApi.updatePassword).toHaveBeenCalledWith(input);

    // 観点2: Contextがfalseにセットされたか
    expect(mockSetPasswordUpdateRequired).toHaveBeenCalledWith(false);
  });
});
