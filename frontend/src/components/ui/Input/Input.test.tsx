import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import React from 'react';
import { Input } from './Input';
import type { AllowedInputType } from './types';

describe('Input', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('id', () => {
      it('id が正しく設定される', () => {
        render(<Input id="test-input" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-input');
      });
    });

    describe('label', () => {
      it('label が表示され、input と紐づく', () => {
        render(<Input id="test-input" label="ユーザー名" />);
        const label = screen.getByText('ユーザー名');
        expect(label).toHaveAttribute('for', 'test-input');
        expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument();
      });
    });

    describe('type', () => {
      it.each<AllowedInputType>([
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
      ])('type="%s" が正しく設定される', (type) => {
        const { container } = render(<Input type={type} />);
        const input = container.querySelector('input');
        expect(input).toHaveAttribute('type', type);
      });
    });

    describe('error', () => {
      it('エラーメッセージが表示される', () => {
        render(<Input id="test" error="入力エラーです" />);
        expect(screen.getByRole('alert')).toHaveTextContent('入力エラーです');
      });

      it('エラー時に input が aria-invalid="true" になる', () => {
        render(<Input error="エラー" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
      });

      it('エラー時に input が赤いボーダーになる', () => {
        render(<Input error="エラー" />);
        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
      });

      it('エラー時に aria-describedby が設定される', () => {
        render(<Input id="test" error="エラー" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-error');
      });
    });

    describe('required', () => {
      it('required=true で必須マークが表示される', () => {
        render(<Input label="名前" required />);
        expect(screen.getByText('*')).toBeInTheDocument();
      });

      it('required=true で aria-required="true" が設定される', () => {
        render(<Input required />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
      });

      it('label がない場合、required でも必須マークが表示されない', () => {
        render(<Input required />);
        expect(screen.queryByText('*')).not.toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled=true で入力が無効化される', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
      });

      it('disabled=true で disabled スタイルが適用される', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toHaveClass(
          'disabled:bg-gray-100',
          'disabled:text-gray-400'
        );
      });
    });

    describe('leftIcon', () => {
      it('leftIcon が表示され、左パディングが適用される', () => {
        render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveClass('pl-6');
      });
    });

    describe('rightIcon', () => {
      it('rightIcon が表示され、右パディングが適用される', () => {
        render(<Input rightIcon={<span data-testid="right-icon">👁️</span>} />);
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveClass('pr-6');
      });
    });

    describe('helperText', () => {
      it('helperText が表示される', () => {
        render(<Input id="test" helperText="8文字以上で入力してください" />);
        expect(screen.getByRole('note')).toHaveTextContent('8文字以上で入力してください');
      });

      it('helperText がある場合、aria-describedby が設定される', () => {
        render(<Input id="test" helperText="ヘルプ" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-help');
      });

      it('error と helperText が両方ある場合、error のみ表示される', () => {
        render(<Input id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('alert')).toHaveTextContent('エラー');
        expect(screen.queryByRole('note')).not.toBeInTheDocument();
      });

      it('error と helperText が両方ある場合、aria-describedby に両方含まれる', () => {
        render(<Input id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('textbox')).toHaveAttribute(
          'aria-describedby',
          'test-error test-help'
        );
      });
    });

    describe('className', () => {
      it('カスタム className がコンテナに適用される', () => {
        const { container } = render(<Input className="custom-container" />);
        expect(container.firstChild).toHaveClass('custom-container', 'flex', 'flex-col');
      });
    });

    describe('inputClassName', () => {
      it('カスタム inputClassName が input に適用される', () => {
        render(<Input inputClassName="custom-input" />);
        expect(screen.getByRole('textbox')).toHaveClass('custom-input', 'w-full', 'rounded-lg');
      });
    });

    describe('labelClassName', () => {
      it('カスタム labelClassName が label に適用される', () => {
        render(<Input label="名前" labelClassName="custom-label" />);
        expect(screen.getByText('名前')).toHaveClass('custom-label', 'text-sm', 'font-medium');
      });
    });

    describe('その他の HTML 属性', () => {
      it('placeholder が正しく設定される', () => {
        render(<Input placeholder="入力してください" />);
        expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument();
      });

      it('value が正しく設定される', () => {
        render(<Input value="テスト値" onChange={() => {}} />);
        expect(screen.getByRole('textbox')).toHaveValue('テスト値');
      });

      it('name が正しく設定される', () => {
        render(<Input name="username" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
      });

      it('autoComplete が "off" に設定される', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
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
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'テスト');
      expect(handleChange).toHaveBeenCalled();
    });

    it('フォーカス時に onFocus が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      await user.click(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('ブラー時に onBlur が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('disabled の場合、入力できない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input disabled onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'テスト');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // ref テスト
  // ============================================
  describe('ref', () => {
    it('ref 経由で input 要素にアクセスできる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('ref 経由で focus できる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用される', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveClass(
        'w-full',
        'rounded-lg',
        'border-b',
        'transition-colors',
        'focus:outline-none'
      );
    });

    it('エラーがない場合、グレーのボーダーが適用される', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveClass('border-gray-300');
    });

    it('エラーがある場合、赤いボーダーが適用される', () => {
      render(<Input error="エラー" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('label と input が正しく紐づく', () => {
      render(<Input id="test" label="ユーザー名" />);
      expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument();
    });

    it('エラー時に aria-invalid="true" が設定される', () => {
      render(<Input error="エラー" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーがない場合、aria-invalid="false" が設定される', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('required 時に aria-required が設定される', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('エラーメッセージに role="alert" が設定される', () => {
      render(<Input error="エラー" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('ヘルパーテキストに role="note" が設定される', () => {
      render(<Input helperText="ヘルプ" />);
      expect(screen.getByRole('note')).toBeInTheDocument();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('基本形の HTML 構造', () => {
      const { container } = render(<Input id="test" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('label + required の HTML 構造', () => {
      const { container } = render(<Input id="test" label="名前" required />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('error ありの HTML 構造', () => {
      const { container } = render(<Input id="test" error="入力エラーです" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('helperText ありの HTML 構造', () => {
      const { container } = render(<Input id="test" helperText="8文字以上" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('disabled の HTML 構造', () => {
      const { container } = render(<Input id="test" disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('leftIcon + rightIcon の HTML 構造', () => {
      const { container } = render(
        <Input leftIcon={<span>🔍</span>} rightIcon={<span>👁️</span>} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it.each<AllowedInputType>(['text', 'email', 'password', 'number'])(
      'type="%s" の HTML 構造',
      (type) => {
        const { container } = render(<Input type={type} />);
        expect(container.firstChild).toMatchSnapshot();
      }
    );
  });
});
