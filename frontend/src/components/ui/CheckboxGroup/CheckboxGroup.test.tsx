import { render, screen, fireEvent } from '@testing-library/react';
import { CheckboxGroup } from './CheckboxGroup';
import { vi } from 'vitest';

describe('CheckboxGroup', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('label', () => {
      it('label が正しく表示される', () => {
        render(<CheckboxGroup name="test" label="Test Label" options={mockOptions} />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
      });
    });

    describe('options', () => {
      it('すべてのオプションが表示される', () => {
        render(<CheckboxGroup name="test" options={mockOptions} />);
        expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
        expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
      });
    });

    describe('required', () => {
      it('required 指定時に * が表示される', () => {
        render(<CheckboxGroup name="test" label="Label" options={mockOptions} required />);
        expect(screen.getByText('*')).toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled 指定時にすべてのチェックボックスが無効化される', () => {
        render(<CheckboxGroup name="test" options={mockOptions} disabled />);
        const checkboxes = screen.getAllByRole('checkbox');
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled();
        });
      });
    });

    describe('error', () => {
      it('error メッセージが正しく表示される', () => {
        render(<CheckboxGroup name="test" options={mockOptions} error="Error Message" />);
        expect(screen.getByText('Error Message')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    describe('value', () => {
      it('value で指定されたオプションがチェックされている', () => {
        render(<CheckboxGroup name="test" options={mockOptions} value={['1', '3']} />);
        expect(screen.getByLabelText('Option 1')).toBeChecked();
        expect(screen.getByLabelText('Option 2')).not.toBeChecked();
        expect(screen.getByLabelText('Option 3')).toBeChecked();
      });
    });

    describe('onChange', () => {
      it('チェック時に正しい値で onChange が呼ばれる', () => {
        const handleChange = vi.fn();
        render(
          <CheckboxGroup name="test" options={mockOptions} onChange={handleChange} value={['1']} />,
        );

        fireEvent.click(screen.getByLabelText('Option 2'));
        expect(handleChange).toHaveBeenCalledWith(['1', '2']);
      });

      it('チェック解除時に正しい値で onChange が呼ばれる', () => {
        const handleChange = vi.fn();
        render(
          <CheckboxGroup
            name="test"
            options={mockOptions}
            onChange={handleChange}
            value={['1', '2']}
          />,
        );

        fireEvent.click(screen.getByLabelText('Option 1'));
        expect(handleChange).toHaveBeenCalledWith(['2']);
      });
    });

    describe('className', () => {
      it('カスタム className が適用される', () => {
        const { container } = render(
          <CheckboxGroup name="test" options={mockOptions} className="custom-group" />,
        );
        expect(container.firstChild).toHaveClass('custom-group');
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('error 時に赤いボーダークラスが適用される', () => {
      render(<CheckboxGroup name="test" options={mockOptions} error="Error" />);
      expect(screen.getByRole('group', { hidden: true })).toHaveClass('border-red-500');
    });

    it('通常時にグレーのボーダークラスが適用される', () => {
      render(<CheckboxGroup name="test" options={mockOptions} />);
      expect(screen.getByRole('group', { hidden: true })).toHaveClass('border-gray-200');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('fieldset (role="group") を使用している', () => {
      render(<CheckboxGroup name="test" options={mockOptions} />);
      // legend があるので role="group" とみなされる
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('aria-invalid が正しく設定される', () => {
      render(<CheckboxGroup name="test" options={mockOptions} error="Error" />);
      expect(screen.getByRole('group', { hidden: true })).toHaveAttribute('aria-invalid', 'true');
    });

    it('aria-describedby が errorId を参照している', () => {
      render(<CheckboxGroup name="test" options={mockOptions} error="Error" />);
      const group = screen.getByRole('group', { hidden: true });
      expect(group).toHaveAttribute('aria-describedby', 'test-error');
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('通常状態の HTML 構造', () => {
      const { container } = render(<CheckboxGroup name="test" options={mockOptions} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('複数列表示 (column指定) の HTML 構造', () => {
      const { container } = render(<CheckboxGroup name="test" options={mockOptions} column={2} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
