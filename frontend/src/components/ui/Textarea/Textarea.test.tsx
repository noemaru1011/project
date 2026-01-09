import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import React from 'react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('id', () => {
      it('id が正しく設定される', () => {
        render(<Textarea id="test-textarea" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-textarea');
      });
    });

    describe('label', () => {
      it('label が表示され、textarea と紐づく', () => {
        render(<Textarea id="test-textarea" label="コメント" />);
        const label = screen.getByText('コメント');
        expect(label).toHaveAttribute('for', 'test-textarea');
        expect(screen.getByLabelText('コメント')).toBeInTheDocument();
      });
    });

    describe('error', () => {
      it('エラーメッセージが表示される', () => {
        render(<Textarea id="test" error="入力エラーです" />);
        expect(screen.getByText('入力エラーです')).toBeInTheDocument();
      });

      it('エラー時に textarea が aria-invalid="true" になる', () => {
        render(<Textarea error="エラー" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
      });

      it('エラー時に textarea が赤いボーダーになる', () => {
        render(<Textarea error="エラー" />);
        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
      });

      it('エラー時に aria-describedby が設定される', () => {
        render(<Textarea id="test" error="エラー" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-error');
      });
    });

    describe('required', () => {
      it('required=true で必須マークが表示される', () => {
        render(<Textarea label="コメント" required />);
        expect(screen.getByText('*')).toBeInTheDocument();
      });

      it('required=true で aria-required="true" が設定される', () => {
        render(<Textarea required />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
      });

      it('label がない場合、required でも必須マークが表示されない', () => {
        render(<Textarea required />);
        expect(screen.queryByText('*')).not.toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled=true で入力が無効化される', () => {
        render(<Textarea disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
      });

      it('disabled=true で disabled スタイルが適用される', () => {
        render(<Textarea disabled />);
        expect(screen.getByRole('textbox')).toHaveClass(
          'disabled:bg-gray-100',
          'disabled:text-gray-400'
        );
      });
    });

    describe('helperText', () => {
      it('helperText が表示される', () => {
        render(<Textarea id="test" helperText="200文字以内で入力してください" />);
        expect(screen.getByText('200文字以内で入力してください')).toBeInTheDocument();
      });

      it('helperText がある場合、aria-describedby が設定される', () => {
        render(<Textarea id="test" helperText="ヘルプ" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-help');
      });

      it('error と helperText が両方ある場合、error のみ表示される', () => {
        render(<Textarea id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByText('エラー')).toBeInTheDocument();
        expect(screen.queryByText('ヘルプ')).not.toBeInTheDocument();
      });

      it('error と helperText が両方ある場合、aria-describedby に両方含まれる', () => {
        render(<Textarea id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('textbox')).toHaveAttribute(
          'aria-describedby',
          'test-error test-help'
        );
      });
    });

    describe('className', () => {
      it('カスタム className がコンテナに適用される', () => {
        const { container } = render(<Textarea className="custom-container" />);
        expect(container.firstChild).toHaveClass('custom-container', 'flex', 'flex-col', 'w-full');
      });
    });

    describe('inputClassName', () => {
      it('カスタム inputClassName が textarea に適用される', () => {
        render(<Textarea inputClassName="custom-textarea" />);
        expect(screen.getByRole('textbox')).toHaveClass('custom-textarea', 'w-full', 'rounded-lg');
      });
    });

    describe('labelClassName', () => {
      it('カスタム labelClassName が label に適用される', () => {
        render(<Textarea label="コメント" labelClassName="custom-label" />);
        expect(screen.getByText('コメント')).toHaveClass('custom-label', 'text-sm', 'font-medium');
      });
    });

    describe('その他の HTML 属性', () => {
      it('placeholder が正しく設定される', () => {
        render(<Textarea placeholder="コメントを入力してください" />);
        expect(screen.getByPlaceholderText('コメントを入力してください')).toBeInTheDocument();
      });

      it('value が正しく設定される', () => {
        render(<Textarea value="テスト値" onChange={() => {}} />);
        expect(screen.getByRole('textbox')).toHaveValue('テスト値');
      });

      it('name が正しく設定される', () => {
        render(<Textarea name="comment" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('name', 'comment');
      });

      it('rows が正しく設定される', () => {
        render(<Textarea rows={5} />);
        expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
      });

      it('maxLength が正しく設定される', () => {
        render(<Textarea maxLength={200} />);
        expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '200');
      });
    });
  });

  // ============================================
  // ユーザーインタラクション テスト
  // ============================================
  describe('ユーザーインタラクション', () => {
    it('入力時に onChange が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'テスト');
      expect(handleChange).toHaveBeenCalled();
    });

    it('複数行の入力ができる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), '1行目{Enter}2行目{Enter}3行目');
      expect(handleChange).toHaveBeenCalled();
    });

    it('フォーカス時に onFocus が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Textarea onFocus={handleFocus} />);

      await user.click(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('ブラー時に onBlur が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Textarea onBlur={handleBlur} />);

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('disabled の場合、入力できない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea disabled onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'テスト');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // ref テスト
  // ============================================
  describe('ref', () => {
    it('ref 経由で textarea 要素にアクセスできる', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('ref 経由で focus できる', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用される', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveClass(
        'w-full',
        'min-h-[100px]',
        'px-3',
        'py-2',
        'rounded-lg',
        'border',
        'bg-white'
      );
    });

    it('エラーがない場合、グレーのボーダーが適用される', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveClass('border-gray-300');
    });

    it('エラーがある場合、赤いボーダーが適用される', () => {
      render(<Textarea error="エラー" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });

    it('フォーカススタイルが適用される', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-indigo-500'
      );
    });

    it('エラー時のフォーカススタイルが適用される', () => {
      render(<Textarea error="エラー" />);
      expect(screen.getByRole('textbox')).toHaveClass(
        'focus:ring-red-500',
        'focus:border-red-500'
      );
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('label と textarea が正しく紐づく', () => {
      render(<Textarea id="test" label="コメント" />);
      expect(screen.getByLabelText('コメント')).toBeInTheDocument();
    });

    it('エラー時に aria-invalid="true" が設定される', () => {
      render(<Textarea error="エラー" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーがない場合、aria-invalid="false" が設定される', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('required 時に aria-required が設定される', () => {
      render(<Textarea required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('エラーメッセージが適切な id で紐づく', () => {
      render(<Textarea id="test" error="エラー" />);
      const errorElement = screen.getByText('エラー');
      expect(errorElement).toHaveAttribute('id', 'test-error');
    });

    it('ヘルパーテキストが適切な id で紐づく', () => {
      render(<Textarea id="test" helperText="ヘルプ" />);
      const helpElement = screen.getByText('ヘルプ');
      expect(helpElement).toHaveAttribute('id', 'test-help');
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('基本形の HTML 構造', () => {
      const { container } = render(<Textarea id="test" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('label + required の HTML 構造', () => {
      const { container } = render(<Textarea id="test" label="コメント" required />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('error ありの HTML 構造', () => {
      const { container } = render(<Textarea id="test" error="入力エラーです" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('helperText ありの HTML 構造', () => {
      const { container } = render(<Textarea id="test" helperText="200文字以内" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('disabled の HTML 構造', () => {
      const { container } = render(<Textarea id="test" disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('rows 指定の HTML 構造', () => {
      const { container } = render(<Textarea rows={10} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
