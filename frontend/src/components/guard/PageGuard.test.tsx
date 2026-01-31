import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageGuard } from './PageGuard';
import { useAuth } from '@/contexts/authContext';
import { MemoryRouter, useNavigate } from 'react-router-dom';
// 1. コンポーネントが import しているパスと同じ "@/utils" に合わせる
import * as apiUtils from '@/utils';

// 2. "@/utils" 全体をモック化し、必要な関数をスパイにする
vi.mock('@/contexts/authContext');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

// 3. コンポーネントが参照しているエイリアスパス "@/utils" をモック
vi.mock('@/utils', async () => {
  const actual = await vi.importActual<typeof import('@/utils')>('@/utils');
  return {
    ...actual,
    handleApiErrorWithUI: vi.fn(),
    // authErrorGenerate は実際の挙動が必要ならそのまま、
    // もしステータスだけチェックしたいなら実際の関数を流用
  };
});

describe('PageGuard', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it('【成功】ユーザーが許可されたロールを持つ場合、コンテンツを表示する', () => {
    // --- Arrange ---
    const role = 'admin';
    const allowedRoles: any[] = ['admin'];
    (useAuth as any).mockReturnValue({ role });

    // --- Act ---
    render(
      <MemoryRouter>
        <PageGuard allowedRoles={allowedRoles}>
          <div data-testid="protected-content">Access Granted</div>
        </PageGuard>
      </MemoryRouter>,
    );

    // --- Assert ---
    expect(screen.getByTestId('protected-content')).toBeDefined();
    // 4. 正しいモックオブジェクトを検証
    expect(apiUtils.handleApiErrorWithUI).not.toHaveBeenCalled();
  });

  it('【失敗】未ログイン（roleがnull）の場合、401エラーハンドラーを実行', () => {
    // --- Arrange ---
    (useAuth as any).mockReturnValue({ role: null });

    // --- Act ---
    const { container } = render(
      <MemoryRouter>
        <PageGuard allowedRoles={['ADMIN']}>
          <div>Protected Content</div>
        </PageGuard>
      </MemoryRouter>,
    );

    // --- Assert ---
    expect(apiUtils.handleApiErrorWithUI).toHaveBeenCalledWith(
      expect.objectContaining({ status: 401 }),
      expect.any(Function),
    );
    expect(container.firstChild).toBeNull();
  });

  it('【失敗】権限が不足している場合、403エラーハンドラーを実行', () => {
    // --- Arrange ---
    (useAuth as any).mockReturnValue({ role: 'student' });

    // --- Act ---
    const { container } = render(
      <MemoryRouter>
        <PageGuard allowedRoles={['ADMIN']}>
          <div>Admin Only Content</div>
        </PageGuard>
      </MemoryRouter>,
    );

    // --- Assert ---
    expect(apiUtils.handleApiErrorWithUI).toHaveBeenCalledWith(
      expect.objectContaining({ status: 403 }),
      expect.any(Function),
    );
    expect(container.firstChild).toBeNull();
  });
});
