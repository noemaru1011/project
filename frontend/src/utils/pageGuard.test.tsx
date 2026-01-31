import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { pageGuard } from './index';
import { useAuth } from '@/contexts/authContext';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import * as apiErrorUtils from './handleApiError';

// 依存関係のモック
vi.mock('@/contexts/authContext');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});
vi.mock('./handleApiError');

describe('PageGuard', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it('【成功】ユーザーが許可されたロールを持つ場合、コンテンツを表示する', () => {
    // --- Arrange (準備) ---
    const role = 'admin';
    const allowedRoles: any[] = ['admin'];
    (useAuth as any).mockReturnValue({ role });

    // --- Act (実行) ---
    render(
      <MemoryRouter>
        <pageGuard allowedRoles={allowedRoles}>
          <div data-testid="protected-content">Access Granted</div>
        </pageGuard>
      </MemoryRouter>,
    );

    // --- Assert (検証) ---
    expect(screen.getByTestId('protected-content')).toBeDefined();
    expect(apiErrorUtils.handleApiErrorWithUI).not.toHaveBeenCalled();
  });

  it('【失敗】未ログイン（roleがnull）の場合、401エラーハンドラーを実行して何も表示しない', () => {
    // --- Arrange (準備) ---
    (useAuth as any).mockReturnValue({ role: null });
    const allowedRoles: any[] = ['admin'];

    // --- Act (実行) ---
    const { container } = render(
      <MemoryRouter>
        <pageGuard allowedRoles={allowedRoles}>
          <div>Protected Content</div>
        </pageGuard>
      </MemoryRouter>,
    );

    // --- Assert (検証) ---
    // handleApiErrorWithUIが第一引数に401エラー（authErrorGenerate(401)の結果）を持って呼ばれたか
    expect(apiErrorUtils.handleApiErrorWithUI).toHaveBeenCalledWith(
      expect.objectContaining({ status: 401 }),
      expect.any(Function),
    );
    // 画面には何も表示されていないこと
    expect(container.firstChild).toBeNull();
  });

  it('【失敗】権限が不足している場合、403エラーハンドラーを実行して何も表示しない', () => {
    // --- Arrange (準備) ---
    const role = 'student'; // 学生が
    const allowedRoles: any[] = ['admin']; // 管理者限定ページへ
    (useAuth as any).mockReturnValue({ role });

    // --- Act (実行) ---
    const { container } = render(
      <MemoryRouter>
        <pageGuard allowedRoles={allowedRoles}>
          <div>Admin Only Content</div>
        </pageGuard>
      </MemoryRouter>,
    );

    // --- Assert (検証) ---
    expect(apiErrorUtils.handleApiErrorWithUI).toHaveBeenCalledWith(
      expect.objectContaining({ status: 403 }),
      expect.any(Function),
    );
    expect(container.firstChild).toBeNull();
  });
});
