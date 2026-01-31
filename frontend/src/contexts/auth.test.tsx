import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from './authProvider';
import { useAuth } from './authContext';
import Cookies from 'js-cookie';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import type { Role } from '@shared/models/common';

// js-cookie のモック設定
vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('AuthContext & AuthProvider', () => {
  const mockGet = Cookies.get as unknown as Mock;
  const mockSet = Cookies.set as unknown as Mock;
  const mockRemove = Cookies.remove as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    // デフォルトでは Cookie は空
    mockGet.mockReturnValue(undefined);
  });

  it('【失敗】AuthProvider 配下でない場合、useAuth がエラーを投げること', () => {
    // --- Arrange ---
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // --- Act & Assert ---
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used inside AuthProvider');

    consoleSpy.mockRestore();
  });

  it('【成功】初期レンダリング時に Cookie からロールを復元すること', () => {
    // --- Arrange ---
    const initialRole: Role = 'ADMIN';
    mockGet.mockReturnValue(initialRole);

    // --- Act ---
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // --- Assert ---
    expect(result.current.role).toBe(initialRole);
    expect(mockGet).toHaveBeenCalledWith('role');
  });

  it('【成功】setRole を呼ぶとロールが更新され、セキュアな設定で Cookie に保存されること', () => {
    // --- Arrange ---
    const newRole: Role = 'STUDENT';
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // --- Act ---
    act(() => {
      result.current.setRole(newRole);
    });

    // --- Assert ---
    expect(result.current.role).toBe(newRole);
    // 第3引数のオプションまで検証
    expect(mockSet).toHaveBeenCalledWith('role', newRole, {
      secure: true,
      sameSite: 'strict',
    });
  });

  it('【成功】setRole(null) を呼ぶとロールがクリアされ、Cookie から削除されること', () => {
    // --- Arrange ---
    mockGet.mockReturnValue('ADMIN'); // 初期状態
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // --- Act ---
    act(() => {
      result.current.setRole(null);
    });

    // --- Assert ---
    expect(result.current.role).toBe(null);
    expect(mockRemove).toHaveBeenCalledWith('role');
  });
});
