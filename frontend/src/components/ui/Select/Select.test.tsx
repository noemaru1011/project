import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { Search } from 'lucide-react';
import { vi } from 'vitest';

describe('Select', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('label', () => {
      it('label が正しく表示される', () => {
        render(<Select label="Test Label" options={mockOptions} />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
      });
    });

    describe('options', () => {
      it('options が正しく表示される', () => {
        render(<Select options={mockOptions} />);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });
    });

    describe('required', () => {
      it('required 指定時に * が表示される', () => {
        render(<Select label="Label" options={mockOptions} required />);
        expect(screen.getByText('*')).toBeInTheDocument();
      });
    });

    describe('disabled', () => {
      it('disabled 指定時に select が無効化される', () => {
        render(<Select options={mockOptions} disabled />);
        expect(screen.getByRole('combobox')).toBeDisabled();
      });
    });

    describe('error', () => {
      it('error メッセージが正しく表示される', () => {
        render(<Select options={mockOptions} error="Error Message" />);
        expect(screen.getByText('Error Message')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    describe('helperText', () => {
      it('helperText が正しく表示される', () => {
        render(<Select options={mockOptions} helperText="Help Text" />);
        expect(screen.getByText('Help Text')).toBeInTheDocument();
        expect(screen.getByRole('note')).toBeInTheDocument();
      });
    });

    describe('leftIcon', () => {
      it('leftIcon が指定された場合に表示される', () => {
        render(<Select options={mockOptions} leftIcon={<Search data-testid="search-icon" />} />);
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      });
    });

    describe('onChange', () => {
      it('値の変更時に onChange が呼ばれる', () => {
        const handleChange = vi.fn();
        render(<Select options={mockOptions} onChange={handleChange} />);
        const select = screen.getByRole('combobox');

        fireEvent.change(select, { target: { value: '1' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(select).toHaveValue('1');
      });
    });

    describe('className', () => {
      it('カスタム className が適用される', () => {
        const { container } = render(<Select options={mockOptions} className="custom-container" />);
        expect(container.firstChild).toHaveClass('custom-container');
      });
    });
  });

  // ============================================
  // スタイリング テスト
  // ============================================
  describe('スタイリング', () => {
    it('error 時に赤いボーダークラスが適用される', () => {
      render(<Select options={mockOptions} error="Error" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-red-500');
    });

    it('leftIcon がある場合に左パディングが適用される', () => {
      render(<Select options={mockOptions} leftIcon={<Search />} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('pl-10');
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('aria-required が正しく設定される', () => {
      render(<Select options={mockOptions} required />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    });

    it('error 時に aria-invalid が true になる', () => {
      render(<Select options={mockOptions} error="Error" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('aria-describedby が errorId と helpId を参照している', () => {
      const id = 'test-select';
      render(<Select id={id} options={mockOptions} error="Error" helperText="Help" />);
      const select = screen.getByRole('combobox');
      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).toContain(`${id}-error`);
      expect(describedBy).toContain(`${id}-help`);
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('通常状態の HTML 構造', () => {
      const { container } = render(<Select options={mockOptions} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('エラー状態の HTML 構造', () => {
      const { container } = render(<Select options={mockOptions} error="Error" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
