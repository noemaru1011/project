import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from './Button';
import { VARIANT_STYLES, type ButtonVariant } from './ButtonVariants';

describe('Button', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('variant', () => {
      it.each<ButtonVariant>([
        'Create',
        'Read',
        'Update',
        'Delete',
        'Search',
        'Login',
        'Back',
        'Home',
        'Retry',
        'LastPage',
      ])('variant="%s" で正しいラベルが表示される', (variant) => {
        render(<Button variant={variant} type="button" />);
        expect(
          screen.getByRole('button', { name: VARIANT_STYLES[variant].label })
        ).toBeInTheDocument();
      });

      it.each<ButtonVariant>([
        'Create',
        'Read',
        'Update',
        'Delete',
        'Search',
        'Login',
        'Back',
        'Home',
        'Retry',
        'LastPage',
      ])('variant="%s" で正しい背景色クラスが適用される', (variant) => {
        render(<Button variant={variant} type="button" />);
        const button = screen.getByRole('button');
        const bgClass = VARIANT_STYLES[variant].bg.split(' ')[0];
        expect(button.className).toContain(bgClass);
      });
    });

    describe('type', () => {
      it.each<'button' | 'submit' | 'reset'>(['button', 'submit', 'reset'])(
        'type="%s" が正しく設定される',
        (type) => {
          render(<Button variant="Create" type={type} />);
          expect(screen.getByRole('button')).toHaveAttribute('type', type);
        }
      );
    });

    describe('disabled', () => {
      it('disabled=true でボタンが無効化される', () => {
        render(<Button variant="Create" type="button" disabled />);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });

      it('disabled=false でボタンが有効化される', () => {
        render(<Button variant="Create" type="button" disabled={false} />);
        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'false');
      });

      it('disabled=true でクリックイベントが発火しない', () => {
        const handleClick = vi.fn();
        render(<Button variant="Create" type="button" disabled onClick={handleClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('onClick', () => {
      it('クリック時に onClick が呼ばれる', () => {
        const handleClick = vi.fn();
        render(<Button variant="Create" type="button" onClick={handleClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('className', () => {
      it('カスタム className が追加される', () => {
        render(<Button variant="Create" type="button" className="custom-class" />);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
      });

      it('複数の className が追加される', () => {
        render(<Button variant="Create" type="button" className="custom-1 custom-2" />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-1', 'custom-2');
      });

      it('カスタム className があっても基本クラスは保持される', () => {
        render(<Button variant="Create" type="button" className="custom" />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom', 'px-3', 'py-1', 'rounded-lg');
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用される', () => {
      render(<Button variant="Create" type="button" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'px-3',
        'py-1',
        'rounded-lg',
        'text-white',
        'font-semibold',
        'cursor-pointer'
      );
    });

    it('disabled 用のスタイルクラスが適用される', () => {
      render(<Button variant="Create" type="button" disabled />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('role="button" でアクセス可能', () => {
      render(<Button variant="Create" type="button" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('disabled 時に aria-disabled が正しく設定される', () => {
      const { rerender } = render(<Button variant="Create" type="button" disabled />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');

      rerender(<Button variant="Create" type="button" disabled={false} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'false');
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    describe('variant ごとの構造', () => {
      it.each<ButtonVariant>([
        'Create',
        'Read',
        'Update',
        'Delete',
        'Search',
        'Login',
        'Back',
        'Home',
        'Retry',
        'LastPage',
      ])('variant="%s" の HTML 構造', (variant) => {
        const { container } = render(<Button variant={variant} type="button" />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('type 属性の違い', () => {
      it.each<'button' | 'submit' | 'reset'>(['button', 'submit', 'reset'])(
        'type="%s" の HTML 構造',
        (type) => {
          const { container } = render(<Button variant="Create" type={type} />);
          expect(container.firstChild).toMatchSnapshot();
        }
      );
    });

    describe('disabled 状態の違い', () => {
      it('disabled=true の HTML 構造', () => {
        const { container } = render(<Button variant="Create" type="button" disabled />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('className の違い', () => {
      it('カスタム className ありの HTML 構造', () => {
        const { container } = render(
          <Button variant="Create" type="button" className="custom-class" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
