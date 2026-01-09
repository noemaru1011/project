import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import React from 'react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('id', () => {
      it('id が正しく設定される', () => {
        render(<Checkbox id="test-checkbox" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'test-checkbox');
      });
    });

    describe('label', () => {
      it('label が表示され、checkbox と紐づく', () => {
        render(<Checkbox id="test-checkbox" label="利用規約に同意する" />);
        const label = screen.getByText('利用規約に同意する');
        expect(label).toHaveAttribute('for', 'test-checkbox');
        expect(screen.getByLabelText('利用規約に同意する')).toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled=true でチェックボックスが無効化される', () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
      });

      it('disabled=true で disabled スタイルが適用される', () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole('checkbox')).toHaveClass(
          'disabled:bg-gray-100',
          'disabled:border-gray-200',
          'disabled:cursor-not-allowed'
        );
      });
    });

    describe('error', () => {
      it('エラーメッセージが表示される', () => {
        render(<Checkbox id="test" error="この項目は必須です" />);
        expect(screen.getByRole('alert')).toHaveTextContent('この項目は必須です');
      });

      it('エラー時に checkbox が aria-invalid="true" になる', () => {
        render(<Checkbox error="エラー" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
      });

      it('エラー時に aria-describedby が設定される', () => {
        render(<Checkbox id="test" error="エラー" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', 'test-error');
      });
    });

    describe('helperText', () => {
      it('helperText が表示される', () => {
        render(<Checkbox id="test" helperText="メールマガジンを受け取ります" />);
        expect(screen.getByRole('note')).toHaveTextContent('メールマガジンを受け取ります');
      });

      it('helperText がある場合、aria-describedby が設定される', () => {
        render(<Checkbox id="test" helperText="ヘルプ" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', 'test-help');
      });

      it('error と helperText が両方ある場合、error のみ表示される', () => {
        render(<Checkbox id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('alert')).toHaveTextContent('エラー');
        expect(screen.queryByRole('note')).not.toBeInTheDocument();
      });

      it('error と helperText が両方ある場合、aria-describedby に両方含まれる', () => {
        render(<Checkbox id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute(
          'aria-describedby',
          'test-error test-help'
        );
      });
    });

    describe('className', () => {
      it('カスタム className がコンテナに適用される', () => {
        const { container } = render(<Checkbox className="custom-container" />);
        expect(container.firstChild).toHaveClass('custom-container', 'flex', 'items-center');
      });
    });

    describe('inputClassName', () => {
      it('カスタム inputClassName が checkbox に適用される', () => {
        render(<Checkbox inputClassName="custom-checkbox" />);
        expect(screen.getByRole('checkbox')).toHaveClass('custom-checkbox', 'w-5', 'h-5');
      });
    });

    describe('labelClassName', () => {
      it('カスタム labelClassName が label に適用される', () => {
        render(<Checkbox label="同意する" labelClassName="custom-label" />);
        expect(screen.getByText('同意する')).toHaveClass('custom-label', 'text-gray-700');
      });
    });

    describe('その他の HTML 属性', () => {
      it('checked が正しく設定される', () => {
        render(<Checkbox checked onChange={() => {}} />);
        expect(screen.getByRole('checkbox')).toBeChecked();
      });

      it('defaultChecked が正しく設定される', () => {
        render(<Checkbox defaultChecked />);
        expect(screen.getByRole('checkbox')).toBeChecked();
      });

      it('name が正しく設定される', () => {
        render(<Checkbox name="agreement" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'agreement');
      });

      it('value が正しく設定される', () => {
        render(<Checkbox value="accepted" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'accepted');
      });

      it('required が正しく設定される', () => {
        render(<Checkbox required />);
        expect(screen.getByRole('checkbox')).toBeRequired();
      });
    });
  });

  // ============================================
  // ユーザーインタラクション テスト
  // ============================================
  describe('ユーザーインタラクション', () => {
    it('クリック時に onChange が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('label クリックでチェックボックスが切り替わる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox id="test" label="同意する" onChange={handleChange} />);

      await user.click(screen.getByText('同意する'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('チェック状態が切り替わる', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('disabled の場合、クリックできない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('キーボード操作（Space）でチェックできる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('フォーカス時に onFocus が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Checkbox onFocus={handleFocus} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('ブラー時に onBlur が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Checkbox onBlur={handleBlur} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // ============================================
  // ref テスト
  // ============================================
  describe('ref', () => {
    it('ref 経由で checkbox 要素にアクセスできる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('ref 経由で focus できる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('ref 経由で checked 状態を取得できる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} defaultChecked />);
      expect(ref.current?.checked).toBe(true);
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用される', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveClass(
        'w-5',
        'h-5',
        'rounded-md',
        'accent-indigo-600',
        'border-gray-300'
      );
    });

    it('hover スタイルが適用される', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveClass('hover:border-indigo-400');
    });

    it('transition が適用される', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveClass('transition-colors', 'duration-200');
    });

    it('label に select-none が適用される', () => {
      render(<Checkbox label="同意する" />);
      expect(screen.getByText('同意する')).toHaveClass('select-none');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('role="checkbox" でアクセス可能', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('label と checkbox が正しく紐づく', () => {
      render(<Checkbox id="test" label="同意する" />);
      expect(screen.getByLabelText('同意する')).toBeInTheDocument();
    });

    it('エラー時に aria-invalid="true" が設定される', () => {
      render(<Checkbox error="エラー" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーがない場合、aria-invalid="false" が設定される', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('エラーメッセージに role="alert" が設定される', () => {
      render(<Checkbox error="エラー" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('ヘルパーテキストに role="note" が設定される', () => {
      render(<Checkbox helperText="ヘルプ" />);
      expect(screen.getByRole('note')).toBeInTheDocument();
    });

    it('required 属性が正しく設定される', () => {
      render(<Checkbox required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('基本形の HTML 構造', () => {
      const { container } = render(<Checkbox id="test" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('label ありの HTML 構造', () => {
      const { container } = render(<Checkbox id="test" label="同意する" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('checked 状態の HTML 構造', () => {
      const { container } = render(<Checkbox checked onChange={() => {}} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('error ありの HTML 構造', () => {
      const { container } = render(<Checkbox id="test" error="この項目は必須です" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('helperText ありの HTML 構造', () => {
      const { container } = render(<Checkbox id="test" helperText="任意の項目です" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('disabled の HTML 構造', () => {
      const { container } = render(<Checkbox disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
