import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from './Button';
import type { ButtonVariant } from '@/interface/ui';

describe('Button', () => {
  // コンポーネントに対応したラベル
  const VARIANT_LABELS: Record<ButtonVariant, string> = {
    Create: '新規登録',
    Read: '参照',
    Update: '更新',
    Delete: '削除',
    Search: '検索',
    Login: 'ログイン',
    Back: '一覧に戻る',
    Home: 'ホームに戻る',
  };

  // コンポーネントの bg クラスに対応
  const VARIANT_BG_CLASSES: Record<ButtonVariant, string> = {
    Create: 'bg-blue-500',
    Read: 'bg-gray-500',
    Update: 'bg-green-600',
    Delete: 'bg-red-500',
    Search: 'bg-blue-400',
    Login: 'bg-blue-600',
    Back: 'bg-gray-500',
    Home: 'bg-gray-500',
  };

  const variants: ButtonVariant[] = [
    'Create',
    'Read',
    'Update',
    'Delete',
    'Search',
    'Login',
    'Back',
    'Home',
  ];

  //ボタンに応じて色変更
  it.each(variants)('renders %s button with correct label and bg class', (variant) => {
    render(<Button variant={variant} />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS[variant] });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(VARIANT_BG_CLASSES[variant]);
    expect(button).toHaveClass('px-3', 'py-1', 'rounded-lg', 'text-white', 'font-semibold');
  });

  //クリック時
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button variant="Create" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS['Create'] });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button variant="Create" disabled />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS['Create'] });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('applies custom className', () => {
    render(<Button variant="Create" className="my-custom-class" />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS['Create'] });
    expect(button).toHaveClass('my-custom-class');
  });

  it('uses correct type attribute', () => {
    render(<Button variant="Create" type="submit" />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS['Create'] });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('defaults type to button if not specified', () => {
    render(<Button variant="Create" />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS['Create'] });
    expect(button).toHaveAttribute('type', 'button');
  });
});
