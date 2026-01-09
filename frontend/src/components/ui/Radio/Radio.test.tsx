import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import React from 'react';
import { Radio } from './Radio';

describe('Radio', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('id', () => {
      it('id が正しく設定される', () => {
        render(<Radio id="test-radio" />);
        expect(screen.getByRole('radio')).toHaveAttribute('id', 'test-radio');
      });
    });

    describe('label', () => {
      it('label が表示され、radio と紐づく', () => {
        render(<Radio id="test-radio" label="オプション1" />);
        const label = screen.getByText('オプション1');
        expect(label).toHaveAttribute('for', 'test-radio');
        expect(screen.getByLabelText('オプション1')).toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled=true でラジオボタンが無効化される', () => {
        render(<Radio disabled />);
        expect(screen.getByRole('radio')).toBeDisabled();
      });

      it('disabled=true で disabled スタイルが適用される', () => {
        render(<Radio disabled />);
        expect(screen.getByRole('radio')).toHaveClass(
          'disabled:bg-gray-100',
          'disabled:cursor-not-allowed'
        );
      });
    });

    describe('error', () => {
      it('エラーメッセージが表示される', () => {
        render(<Radio id="test" error="選択してください" />);
        expect(screen.getByRole('alert')).toHaveTextContent('選択してください');
      });

      it('エラー時に radio が aria-invalid="true" になる', () => {
        render(<Radio error="エラー" />);
        expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
      });

      it('エラー時に aria-describedby が設定される', () => {
        render(<Radio id="test" error="エラー" />);
        expect(screen.getByRole('radio')).toHaveAttribute('aria-describedby', 'test-error');
      });
    });

    describe('helperText', () => {
      it('helperText が表示される', () => {
        render(<Radio id="test" helperText="推奨オプションです" />);
        expect(screen.getByRole('note')).toHaveTextContent('推奨オプションです');
      });

      it('helperText がある場合、aria-describedby が設定される', () => {
        render(<Radio id="test" helperText="ヘルプ" />);
        expect(screen.getByRole('radio')).toHaveAttribute('aria-describedby', 'test-help');
      });

      it('error と helperText が両方ある場合、error のみ表示される', () => {
        render(<Radio id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('alert')).toHaveTextContent('エラー');
        expect(screen.queryByRole('note')).not.toBeInTheDocument();
      });

      it('error と helperText が両方ある場合、aria-describedby に両方含まれる', () => {
        render(<Radio id="test" error="エラー" helperText="ヘルプ" />);
        expect(screen.getByRole('radio')).toHaveAttribute(
          'aria-describedby',
          'test-error test-help'
        );
      });
    });

    describe('className', () => {
      it('カスタム className がコンテナに適用される', () => {
        const { container } = render(<Radio className="custom-container" />);
        expect(container.firstChild).toHaveClass('custom-container', 'flex', 'items-center');
      });
    });

    describe('inputClassName', () => {
      it('カスタム inputClassName が radio に適用される', () => {
        render(<Radio inputClassName="custom-radio" />);
        expect(screen.getByRole('radio')).toHaveClass('custom-radio', 'border', 'rounded-sm');
      });
    });

    describe('labelClassName', () => {
      it('カスタム labelClassName が label に適用される', () => {
        render(<Radio label="オプション" labelClassName="custom-label" />);
        expect(screen.getByText('オプション')).toHaveClass('custom-label', 'text-gray-700');
      });
    });

    describe('その他の HTML 属性', () => {
      it('checked が正しく設定される', () => {
        render(<Radio checked onChange={() => {}} />);
        expect(screen.getByRole('radio')).toBeChecked();
      });

      it('defaultChecked が正しく設定される', () => {
        render(<Radio defaultChecked />);
        expect(screen.getByRole('radio')).toBeChecked();
      });

      it('name が正しく設定される', () => {
        render(<Radio name="option" />);
        expect(screen.getByRole('radio')).toHaveAttribute('name', 'option');
      });

      it('value が正しく設定される', () => {
        render(<Radio value="option1" />);
        expect(screen.getByRole('radio')).toHaveAttribute('value', 'option1');
      });

      it('required が正しく設定される', () => {
        render(<Radio required />);
        expect(screen.getByRole('radio')).toBeRequired();
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
      render(<Radio onChange={handleChange} />);

      await user.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('label クリックでラジオボタンが選択される', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio id="test" label="オプション1" onChange={handleChange} />);

      await user.click(screen.getByText('オプション1'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('選択状態になる', async () => {
      const user = userEvent.setup();
      render(<Radio />);

      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();

      await user.click(radio);
      expect(radio).toBeChecked();
    });

    it('disabled の場合、クリックできない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio disabled onChange={handleChange} />);

      await user.click(screen.getByRole('radio'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('キーボード操作（Space）で選択できる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio onChange={handleChange} />);

      const radio = screen.getByRole('radio');
      radio.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('フォーカス時に onFocus が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Radio onFocus={handleFocus} />);

      await user.click(screen.getByRole('radio'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('ブラー時に onBlur が呼ばれる', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Radio onBlur={handleBlur} />);

      const radio = screen.getByRole('radio');
      await user.click(radio);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // ============================================
  // ref テスト
  // ============================================
  describe('ref', () => {
    it('ref 経由で radio 要素にアクセスできる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('radio');
    });

    it('ref 経由で focus できる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('ref 経由で checked 状態を取得できる', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio ref={ref} defaultChecked />);
      expect(ref.current?.checked).toBe(true);
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用される', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toHaveClass(
        'border',
        'rounded-sm',
        'accent-blue-600'
      );
    });

    it('disabled スタイルが適用される', () => {
      render(<Radio disabled />);
      expect(screen.getByRole('radio')).toHaveClass(
        'disabled:bg-gray-100',
        'disabled:cursor-not-allowed'
      );
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('role="radio" でアクセス可能', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('label と radio が正しく紐づく', () => {
      render(<Radio id="test" label="オプション" />);
      expect(screen.getByLabelText('オプション')).toBeInTheDocument();
    });

    it('エラー時に aria-invalid="true" が設定される', () => {
      render(<Radio error="エラー" />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーがない場合、aria-invalid="false" が設定される', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'false');
    });

    it('エラーメッセージに role="alert" が設定される', () => {
      render(<Radio error="エラー" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('ヘルパーテキストに role="note" が設定される', () => {
      render(<Radio helperText="ヘルプ" />);
      expect(screen.getByRole('note')).toBeInTheDocument();
    });

    it('required 属性が正しく設定される', () => {
      render(<Radio required />);
      expect(screen.getByRole('radio')).toBeRequired();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('基本形の HTML 構造', () => {
      const { container } = render(<Radio id="test" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('label ありの HTML 構造', () => {
      const { container } = render(<Radio id="test" label="オプション1" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('checked 状態の HTML 構造', () => {
      const { container } = render(<Radio checked onChange={() => {}} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('error ありの HTML 構造', () => {
      const { container } = render(<Radio id="test" error="選択してください" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('helperText ありの HTML 構造', () => {
      const { container } = render(<Radio id="test" helperText="推奨オプション" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('disabled の HTML 構造', () => {
      const { container } = render(<Radio disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
