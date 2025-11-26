import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from './Button';
import type { ButtonVariant } from '@/interface/ui';

describe('Button', () => {
  const VARIANT_LABELS: Record<ButtonVariant, string> = {
    Create: '新規登録',
    Read: '参照',
    Update: '更新',
    Delete: '削除',
    Search: '検索',
    Login: 'ログイン',
    Back: '一覧に戻る',
  };

  const VARIANT_STYLES: Record<ButtonVariant, string> = {
    Create: 'bg-purple-400',
    Read: 'bg-green-400',
    Update: 'bg-yellow-400',
    Delete: 'bg-red-400',
    Search: 'bg-blue-400',
    Login: 'bg-blue-400',
    Back: 'bg-blue-400',
  };

  const variants: ButtonVariant[] = [
    'Create',
    'Read',
    'Update',
    'Delete',
    'Search',
    'Login',
    'Back',
  ];

  it.each(variants)('renders %s button with correct label and class', (variant) => {
    render(<Button variant={variant} />);
    const button = screen.getByRole('button', { name: VARIANT_LABELS[variant] });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(VARIANT_STYLES[variant]);
  });

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
    expect(button).toHaveClass('disabled:opacity-50');
  });
});
