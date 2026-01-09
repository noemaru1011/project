import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('loading', () => {
      it('loading=true でスピナーが表示される', () => {
        render(<Loading loading />);
        expect(screen.getByRole('status')).toBeInTheDocument();
      });

      it('loading=false で children が表示される', () => {
        render(
          <Loading loading={false}>
            <div>コンテンツ</div>
          </Loading>
        );
        expect(screen.getByText('コンテンツ')).toBeInTheDocument();
      });

      it('loading=true で children が表示されない', () => {
        render(
          <Loading loading>
            <div>コンテンツ</div>
          </Loading>
        );
        expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument();
      });
    });

    describe('children', () => {
      it('children がない場合でも正常に動作する', () => {
        const { container } = render(<Loading loading={false} />);
        expect(container.firstChild).toBeEmptyDOMElement();
      });
    });

    describe('loadingText', () => {
      it('カスタム loadingText が設定される', () => {
        render(<Loading loading loadingText="データを取得中..." />);
        expect(screen.getByText('データを取得中...')).toBeInTheDocument();
      });

      it('loadingText 未指定でデフォルトテキストが表示される', () => {
        render(<Loading loading />);
        expect(screen.getByText('読み込み中')).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('スピナーに正しいスタイルクラスが適用される', () => {
      const { container } = render(<Loading loading />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass(
        'rounded-full',
        'h-12',
        'w-12',
        'border-t-4',
        'border-blue-500',
        'border-solid'
      );
    });

    it('コンテナに正しいスタイルクラスが適用される', () => {
      render(<Loading loading />);
      expect(screen.getByRole('status')).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'h-64'
      );
    });

    it('loadingText に sr-only クラスが適用される', () => {
      render(<Loading loading />);
      const text = screen.getByText('読み込み中');
      expect(text).toHaveClass('sr-only');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('role="status" が設定される', () => {
      render(<Loading loading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('aria-live="polite" が設定される', () => {
      render(<Loading loading />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    it('aria-busy="true" が設定される', () => {
      render(<Loading loading />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });

    it('スクリーンリーダー用のテキストが存在する', () => {
      render(<Loading loading />);
      expect(screen.getByText('読み込み中')).toBeInTheDocument();
    });

    it('カスタム loadingText がスクリーンリーダーに読まれる', () => {
      render(<Loading loading loadingText="ユーザー情報を取得中" />);
      expect(screen.getByText('ユーザー情報を取得中')).toBeInTheDocument();
    });
  });

  // ============================================
  // 条件分岐テスト
  // ============================================
  describe('条件分岐', () => {
    it('loading 状態の切り替えが正しく動作する', () => {
      const { rerender } = render(
        <Loading loading>
          <div>コンテンツ</div>
        </Loading>
      );

      // loading=true の状態
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument();

      // loading=false に切り替え
      rerender(
        <Loading loading={false}>
          <div>コンテンツ</div>
        </Loading>
      );

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(screen.getByText('コンテンツ')).toBeInTheDocument();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('loading=true の HTML 構造', () => {
      const { container } = render(<Loading loading />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('loading=false の HTML 構造', () => {
      const { container } = render(
        <Loading loading={false}>
          <div>コンテンツ</div>
        </Loading>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('カスタム loadingText の HTML 構造', () => {
      const { container } = render(<Loading loading loadingText="処理中..." />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('children なしの HTML 構造', () => {
      const { container } = render(<Loading loading={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
