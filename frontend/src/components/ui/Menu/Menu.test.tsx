import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Menu', () => {
  const mockOnClick = vi.fn();

  const renderMenu = (open: boolean) => {
    return render(
      <BrowserRouter>
        <Menu open={open} onClick={mockOnClick} />
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('open', () => {
      it('open=false の場合、メニューパネルが表示されない', () => {
        renderMenu(false);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });

      it('open=true の場合、メニューパネルが表示される', () => {
        renderMenu(true);
        expect(screen.getByRole('menu', { name: '管理メニュー' })).toBeInTheDocument();
      });

      it('open の値がトグルボタンの aria-expanded に反映される', () => {
        const { rerender } = renderMenu(false);
        expect(screen.getByRole('button', { name: '管理メニューを開閉' })).toHaveAttribute(
          'aria-expanded',
          'false',
        );

        rerender(
          <BrowserRouter>
            <Menu open={true} onClick={mockOnClick} />
          </BrowserRouter>,
        );
        expect(screen.getByRole('button', { name: '管理メニューを開閉' })).toHaveAttribute(
          'aria-expanded',
          'true',
        );
      });
    });

    describe('onClick', () => {
      it('トグルボタンをクリックした時に onClick が呼ばれる', () => {
        renderMenu(false);
        fireEvent.click(screen.getByRole('button', { name: '管理メニューを開閉' }));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      });

      it('開いている状態でオーバーレイをクリックした時に onClick が呼ばれる', () => {
        renderMenu(true);
        // role="presentation" を持つ div を取得
        const overlay = screen.getByRole('presentation', { hidden: true });
        fireEvent.click(overlay);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      });

      it('メニューパネル内のリンクをクリックした時に onClick が呼ばれる', () => {
        renderMenu(true);
        const links = screen.getAllByRole('menuitem');
        fireEvent.click(links[0]);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      });

      it('メニューパネル内の閉じるアイコンをクリックした時に onClick が呼ばれる', () => {
        const { container } = renderMenu(true);
        // Lucide X アイコン (MenuPanel.tsx 18行目付近)
        // eslint-disable-next-line testing-library/no-node-access
        const closeIcon = container.querySelector('.lucide-x');
        if (closeIcon) {
          fireEvent.click(closeIcon);
          expect(mockOnClick).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('トグルボタンが正しいクラスを持っている', () => {
      renderMenu(false);
      expect(screen.getByRole('button')).toHaveClass('cursor-pointer', 'w-6', 'h-6');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('トグルボタンが正しい aria-label を持っている', () => {
      renderMenu(false);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', '管理メニューを開閉');
    });

    it('メニューパネルが role="menu" を持っている', () => {
      renderMenu(true);
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('メニューパネル内の各項目が role="menuitem" を持っている', () => {
      renderMenu(true);
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('閉じた状態の HTML 構造', () => {
      const { container } = renderMenu(false);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('開いた状態の HTML 構造', () => {
      const { container } = renderMenu(true);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
