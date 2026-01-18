import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from './Button';
import { VARIANT_STYLES, type ButtonVariant } from './ButtonVariant';

describe('Button コンポーネント', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props', () => {
    it.each(Object.entries(VARIANT_STYLES) as [ButtonVariant, { class: string }][])(
      'variant=%s で正しいクラスが適用される',
      (variant, style) => {
        render(<Button variant={variant} type="button" label="Test" />);
        const button = screen.getByRole('button', { name: 'Test' });

        // variant クラスを含む
        expect(button.className).toContain(style.class.split(' ')[0]);

        // 基本クラスも保持
        expect(button).toHaveClass('px-3', 'py-1', 'rounded-lg');
      },
    );

    it('type 属性が正しく設定される', () => {
      render(<Button variant="Primary" type="submit" label="Submit" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('disabled=true でボタンが無効化される', () => {
      const handleClick = vi.fn();
      render(
        <Button variant="Primary" type="button" disabled onClick={handleClick} label="Click" />,
      );
      const button = screen.getByRole('button', { name: 'Click' });

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('onClick が呼ばれる', () => {
      const handleClick = vi.fn();
      render(<Button variant="Primary" type="button" onClick={handleClick} label="Click" />);
      const button = screen.getByRole('button', { name: 'Click' });

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('カスタム className が追加される', () => {
      render(<Button variant="Primary" type="button" label="Test" className="custom" />);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button).toHaveClass('custom');
      expect(button).toHaveClass('px-3', 'py-1', 'rounded-lg');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('Accessibility', () => {
    it('role="button" でアクセス可能', () => {
      render(<Button variant="Primary" type="button" label="Label" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('icon ボタンは ariaLabel が必須', () => {
      render(
        <Button variant="Primary" type="button" ariaLabel="Settings">
          <span data-testid="icon">Icon</span>
        </Button>,
      );

      const button = screen.getByRole('button', { name: 'Settings' });
      expect(button).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('disabled 時に aria-disabled が正しく設定される', () => {
      const { rerender } = render(
        <Button variant="Primary" type="button" disabled label="Disabled" />,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');

      rerender(<Button variant="Primary" type="button" disabled={false} label="Enabled" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'false');
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('Styling', () => {
    it('基本スタイルが適用される', () => {
      render(<Button variant="Primary" type="button" label="Test" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'px-3',
        'py-1',
        'rounded-lg',
        'text-white',
        'font-semibold',
        'cursor-pointer',
      );
    });

    it('disabled 用スタイルが適用される', () => {
      render(<Button variant="Primary" type="button" disabled label="Disabled" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('Snapshots', () => {
    it.each(Object.entries(VARIANT_STYLES) as [ButtonVariant, { class: string }][])(
      'variant=%s の HTML 構造',
      (variant) => {
        const { container } = render(<Button variant={variant} type="button" label="Snap" />);
        expect(container.firstChild).toMatchSnapshot();
      },
    );

    it('disabled 状態のスナップショット', () => {
      const { container } = render(
        <Button variant="Primary" type="button" disabled label="Disabled" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('カスタム className のスナップショット', () => {
      const { container } = render(
        <Button variant="Primary" type="button" label="Custom" className="my-class" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
