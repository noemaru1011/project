import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './Accordion';
import { Mail } from 'lucide-react';

describe('Accordion', () => {
  const mockItems = [
    { id: '1', title: 'Item 1', children: 'Content 1' },
    { id: '2', title: 'Item 2', children: 'Content 2' },
  ];

  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('items', () => {
      it('items のタイトルがすべて表示される', () => {
        render(<Accordion items={mockItems} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });

      it('クリックでアイテムの開閉が切り替わる', () => {
        render(<Accordion items={mockItems} />);
        const button = screen.getByRole('button', { name: /Item 1/ });

        // 初期状態は閉じている
        expect(button).toHaveAttribute('aria-expanded', 'false');

        // クリックで開く
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');

        // 再度クリックで閉じる
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    describe('defaultOpen', () => {
      it('defaultOpen が true のアイテムが初期状態で展開されている', () => {
        const itemsWithDefault = [
          { id: '1', title: 'Item 1', children: 'Content 1', defaultOpen: true },
        ];
        render(<Accordion items={itemsWithDefault} />);
        const button = screen.getByRole('button', { name: /Item 1/ });
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    describe('allowMultiple', () => {
      it('allowMultiple=false (デフォルト) の場合、他を開くと現在開いているものが閉じる', () => {
        render(<Accordion items={mockItems} />);
        const button1 = screen.getByRole('button', { name: /Item 1/ });
        const button2 = screen.getByRole('button', { name: /Item 2/ });

        // 1つ目を開く
        fireEvent.click(button1);
        expect(button1).toHaveAttribute('aria-expanded', 'true');

        // 2つ目を開く
        fireEvent.click(button2);
        expect(button2).toHaveAttribute('aria-expanded', 'true');
        // 1つ目が閉じているはず
        expect(button1).toHaveAttribute('aria-expanded', 'false');
      });

      it('allowMultiple=true の場合、複数のアイテムを同時に開ける', () => {
        render(<Accordion items={mockItems} allowMultiple={true} />);
        const button1 = screen.getByRole('button', { name: /Item 1/ });
        const button2 = screen.getByRole('button', { name: /Item 2/ });

        fireEvent.click(button1);
        fireEvent.click(button2);

        expect(button1).toHaveAttribute('aria-expanded', 'true');
        expect(button2).toHaveAttribute('aria-expanded', 'true');
      });
    });

    describe('icon', () => {
      it('icon が指定された場合に表示される', () => {
        const itemsWithIcon = [
          {
            id: '1',
            title: 'Item 1',
            children: 'Content 1',
            icon: <Mail data-testid="mail-icon" />,
          },
        ];
        render(<Accordion items={itemsWithIcon} />);
        expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
      });
    });

    describe('badge', () => {
      it('badge が指定された場合に表示される', () => {
        const itemsWithBadge = [{ id: '1', title: 'Item 1', children: 'Content 1', badge: 'New' }];
        render(<Accordion items={itemsWithBadge} />);
        expect(screen.getByText('New')).toBeInTheDocument();
      });
    });

    describe('className', () => {
      it('カスタム className が適用される', () => {
        const { container } = render(<Accordion items={mockItems} className="custom-accordion" />);
        expect(container.firstChild).toHaveClass('custom-accordion');
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('展開時に特定の背景色が適用される', () => {
      render(<Accordion items={mockItems} />);
      const button = screen.getByRole('button', { name: /Item 1/ });

      fireEvent.click(button);
      expect(button).toHaveClass('bg-indigo-50');
    });

    it('閉鎖時に特定の背景色が適用される', () => {
      render(<Accordion items={mockItems} />);
      const button = screen.getByRole('button', { name: /Item 1/ });
      expect(button).toHaveClass('bg-white');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('各アイテムが role="button" を持っている', () => {
      render(<Accordion items={mockItems} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(mockItems.length);
    });

    it('aria-controls と id が正しく紐付いている', () => {
      render(<Accordion items={[{ id: '1', title: 'Item 1', children: 'Content' }]} />);
      const button = screen.getByRole('button');
      const contentId = button.getAttribute('aria-controls');
      expect(contentId).toBe('Item 1-content');

      // コンテンツの要素が存在することを確認
      // eslint-disable-next-line testing-library/no-node-access
      const content = document.getElementById(contentId!);
      expect(content).toBeInTheDocument();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('デフォルト状態の HTML 構造', () => {
      const { container } = render(<Accordion items={mockItems} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('アイテム展開時の HTML 構造', () => {
      const { container } = render(<Accordion items={mockItems} />);
      fireEvent.click(screen.getByRole('button', { name: /Item 1/ }));
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
