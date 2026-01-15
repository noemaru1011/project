import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { RadioGroup } from './RadioGroup';
import type { Option } from '@/components/ui/option';

describe('RadioGroup', () => {
  const mockOptions: Option[] = [
    { value: 'option1', label: 'オプション1' },
    { value: 'option2', label: 'オプション2' },
    { value: 'option3', label: 'オプション3' },
  ];

  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('name', () => {
      it('name が各 Radio に正しく設定される', () => {
        render(<RadioGroup name="test-group" options={mockOptions} />);
        const radios = screen.getAllByRole('radio');
        radios.forEach((radio) => {
          expect(radio).toHaveAttribute('name', 'test-group');
        });
      });
    });

    describe('options', () => {
      it('options の数だけ Radio が表示される', () => {
        render(<RadioGroup name="test" options={mockOptions} />);
        expect(screen.getAllByRole('radio')).toHaveLength(3);
      });

      it('各 option の label が表示される', () => {
        render(<RadioGroup name="test" options={mockOptions} />);
        expect(screen.getByText('オプション1')).toBeInTheDocument();
        expect(screen.getByText('オプション2')).toBeInTheDocument();
        expect(screen.getByText('オプション3')).toBeInTheDocument();
      });

      it('各 option の value が正しく設定される', () => {
        render(<RadioGroup name="test" options={mockOptions} />);
        expect(screen.getByLabelText('オプション1')).toHaveAttribute('value', 'option1');
        expect(screen.getByLabelText('オプション2')).toHaveAttribute('value', 'option2');
        expect(screen.getByLabelText('オプション3')).toHaveAttribute('value', 'option3');
      });

      it('label がない option は表示されない', () => {
        const optionsWithoutLabel: Option[] = [
          { value: 'option1', label: 'オプション1' },
          { value: 'option2', label: '' },
          { value: 'option3', label: 'オプション3' },
        ];
        render(<RadioGroup name="test" options={optionsWithoutLabel} />);
        expect(screen.getAllByRole('radio')).toHaveLength(2);
      });

      it('空の options でもエラーにならない', () => {
        render(<RadioGroup name="test" options={[]} />);
        expect(screen.queryAllByRole('radio')).toHaveLength(0);
      });
    });

    describe('label', () => {
      it('label が legend として表示される', () => {
        render(<RadioGroup name="test" options={mockOptions} label="プランを選択" />);
        expect(screen.getByText('プランを選択')).toBeInTheDocument();
      });

      it('label が fieldset の legend になる', () => {
        const { container } = render(
          <RadioGroup name="test" options={mockOptions} label="プランを選択" />,
        );
        const legend = container.querySelector('legend');
        expect(legend).toHaveTextContent('プランを選択');
      });
    });

    describe('error', () => {
      it('エラーメッセージが表示される', () => {
        render(<RadioGroup name="test" options={mockOptions} error="選択してください" />);
        expect(screen.getByRole('alert')).toHaveTextContent('選択してください');
      });

      it('エラー時に fieldset が aria-invalid="true" になる', () => {
        render(<RadioGroup name="test" options={mockOptions} error="エラー" />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toHaveAttribute('aria-invalid', 'true');
      });

      it('エラー時に赤いボーダーが適用される', () => {
        render(<RadioGroup name="test" options={mockOptions} error="エラー" />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toHaveClass('border-red-500');
      });

      it('エラー時に aria-describedby が設定される', () => {
        render(<RadioGroup name="test" options={mockOptions} error="エラー" />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toHaveAttribute('aria-describedby', 'test-error');
      });

      it('エラーがない場合、グレーのボーダーが適用される', () => {
        render(<RadioGroup name="test" options={mockOptions} />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toHaveClass('border-gray-200');
      });
    });

    describe('required', () => {
      it('required=true で必須マークが表示される', () => {
        render(<RadioGroup name="test" options={mockOptions} label="プラン" required />);
        expect(screen.getByText('*')).toBeInTheDocument();
      });

      it('required=true で aria-required="true" が設定される', () => {
        render(<RadioGroup name="test" options={mockOptions} required />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toHaveAttribute('aria-required', 'true');
      });

      it('label がない場合、required でも必須マークが表示されない', () => {
        render(<RadioGroup name="test" options={mockOptions} required />);
        expect(screen.queryByText('*')).not.toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled=true で fieldset が無効化される', () => {
        render(<RadioGroup name="test" options={mockOptions} disabled />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toBeDisabled();
      });

      it('disabled=true で全ての Radio が無効化される', () => {
        render(<RadioGroup name="test" options={mockOptions} disabled />);
        const radios = screen.getAllByRole('radio');
        radios.forEach((radio) => {
          expect(radio).toBeDisabled();
        });
      });
    });

    describe('column', () => {
      it('column 未指定で横一列に表示される', () => {
        const { container } = render(<RadioGroup name="test" options={mockOptions} />);
        const rows = container.querySelectorAll('.flex.flex-row');
        expect(rows).toHaveLength(1);
      });

      it('column=2 で2列グリッドになる', () => {
        const { container } = render(<RadioGroup name="test" options={mockOptions} column={2} />);
        const rows = container.querySelectorAll('.flex.flex-row');
        expect(rows).toHaveLength(2); // 3つのオプション ÷ 2列 = 2行
      });

      it('column=3 で3列グリッドになる', () => {
        const { container } = render(<RadioGroup name="test" options={mockOptions} column={3} />);
        const rows = container.querySelectorAll('.flex.flex-row');
        expect(rows).toHaveLength(1); // 3つのオプション ÷ 3列 = 1行
      });

      it('column=1 で縦一列になる', () => {
        const { container } = render(<RadioGroup name="test" options={mockOptions} column={1} />);
        const rows = container.querySelectorAll('.flex.flex-row');
        expect(rows).toHaveLength(3);
      });

      it('column=0 で横一列になる（デフォルト動作）', () => {
        const { container } = render(<RadioGroup name="test" options={mockOptions} column={0} />);
        const rows = container.querySelectorAll('.flex.flex-row');
        expect(rows).toHaveLength(1);
      });

      it('column が options より多い場合、1行になる', () => {
        const { container } = render(<RadioGroup name="test" options={mockOptions} column={10} />);
        const rows = container.querySelectorAll('.flex.flex-row');
        expect(rows).toHaveLength(1);
      });
    });

    describe('value', () => {
      it('value に一致する Radio が選択される', () => {
        render(<RadioGroup name="test" options={mockOptions} value="option2" />);
        expect(screen.getByLabelText('オプション2')).toBeChecked();
      });

      it('value 未指定でどの Radio も選択されない', () => {
        render(<RadioGroup name="test" options={mockOptions} />);
        const radios = screen.getAllByRole('radio');
        radios.forEach((radio) => {
          expect(radio).not.toBeChecked();
        });
      });

      it('存在しない value でもエラーにならない', () => {
        render(<RadioGroup name="test" options={mockOptions} value="nonexistent" />);
        const radios = screen.getAllByRole('radio');
        radios.forEach((radio) => {
          expect(radio).not.toBeChecked();
        });
      });
    });

    describe('className', () => {
      it('カスタム className が fieldset に適用される', () => {
        render(<RadioGroup name="test" options={mockOptions} className="custom-class" />);
        const fieldset = screen.getByRole('group');
        expect(fieldset).toHaveClass('custom-class', 'bg-white', 'rounded-lg');
      });
    });

    describe('onChange', () => {
      it('Radio クリック時に onChange が呼ばれる', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(<RadioGroup name="test" options={mockOptions} onChange={handleChange} />);

        await user.click(screen.getByLabelText('オプション2'));
        expect(handleChange).toHaveBeenCalledWith('option2');
        expect(handleChange).toHaveBeenCalledTimes(1);
      });

      it('label クリック時に onChange が呼ばれる', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(<RadioGroup name="test" options={mockOptions} onChange={handleChange} />);

        await user.click(screen.getByText('オプション3'));
        expect(handleChange).toHaveBeenCalledWith('option3');
      });

      it('disabled の場合、クリックしても onChange は呼ばれない', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(<RadioGroup name="test" options={mockOptions} disabled onChange={handleChange} />);

        await user.click(screen.getByLabelText('オプション1'));
        expect(handleChange).not.toHaveBeenCalled();
      });

      it('onChange 未指定でもエラーにならない', async () => {
        const user = userEvent.setup();
        render(<RadioGroup name="test" options={mockOptions} />);

        await expect(user.click(screen.getByLabelText('オプション1'))).resolves.not.toThrow();
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('fieldset に基本スタイルが適用される', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveClass('bg-white', 'rounded-lg', 'p-4', 'shadow-sm', 'border');
    });

    it('エラー時にフォーカスリングが赤くなる', () => {
      render(<RadioGroup name="test" options={mockOptions} error="エラー" />);
      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveClass('focus-within:ring-red-300');
    });

    it('通常時にフォーカスリングが青くなる', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveClass('focus-within:ring-blue-200');
    });

    it('各 Radio に hover スタイルが適用される', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radioContainers = container.querySelectorAll('.hover\\:bg-gray-50');
      expect(radioContainers).toHaveLength(3);
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('fieldset が role="group" でアクセス可能', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('label が legend として fieldset に紐づく', () => {
      render(<RadioGroup name="test" options={mockOptions} label="プラン選択" />);
      const fieldset = screen.getByRole('group', { name: 'プラン選択' });
      expect(fieldset).toBeInTheDocument();
    });

    it('エラー時に aria-invalid="true" が設定される', () => {
      render(<RadioGroup name="test" options={mockOptions} error="エラー" />);
      expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーがない場合、aria-invalid="false" が設定される', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'false');
    });

    it('required 時に aria-required が設定される', () => {
      render(<RadioGroup name="test" options={mockOptions} required />);
      expect(screen.getByRole('group')).toHaveAttribute('aria-required', 'true');
    });

    it('エラーメッセージに role="alert" が設定される', () => {
      render(<RadioGroup name="test" options={mockOptions} error="エラー" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('各 Radio に一意の id が設定される', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      expect(screen.getByLabelText('オプション1')).toHaveAttribute('id', 'test-option1');
      expect(screen.getByLabelText('オプション2')).toHaveAttribute('id', 'test-option2');
      expect(screen.getByLabelText('オプション3')).toHaveAttribute('id', 'test-option3');
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('基本形の HTML 構造', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('label + required の HTML 構造', () => {
      const { container } = render(
        <RadioGroup name="test" options={mockOptions} label="プラン" required />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('error ありの HTML 構造', () => {
      const { container } = render(
        <RadioGroup name="test" options={mockOptions} error="選択してください" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('disabled の HTML 構造', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('column=2 の HTML 構造', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} column={2} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('value 選択済みの HTML 構造', () => {
      const { container } = render(
        <RadioGroup name="test" options={mockOptions} value="option2" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
