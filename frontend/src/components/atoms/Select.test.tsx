import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Select } from './Select';
import type { Option } from '@/interface/ui';

const options: Option[] = [
  { value: '1', label: 'オプション1' },
  { value: '2', label: 'オプション2' },
];

describe('Select', () => {
  it('renders label and required asterisk', () => {
    render(<Select id="test" label="選択肢" required options={options} />);
    expect(screen.getByText('選択肢')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders options', () => {
    render(<Select id="test" options={options} />);
    expect(screen.getByText('選択してください')).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it('applies error style and shows error message', () => {
    render(<Select id="test" options={options} error="必須です" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500');
    expect(screen.getByText('必須です')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Select id="test" options={options} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select id="test" options={options} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
