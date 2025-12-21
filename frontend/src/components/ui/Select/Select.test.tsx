import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';
import type { Option } from '@/components/ui/option';

const options: Option[] = [
  { value: '1', label: 'オプション1' },
  { value: '2', label: 'オプション2' },
];

describe('Select', () => {
  // ラベルと必須
  it('renders label', () => {
    render(<Select id="select1" label="選択肢" options={options} />);
    expect(screen.getByText('選択肢')).toBeInTheDocument();
  });

  it('renders required asterisk', () => {
    render(<Select id="select2" label="必須選択" options={options} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // options
  it('renders default and provided options', () => {
    render(<Select id="select3" options={options} />);
    expect(screen.getByText('選択してください')).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  // error
  it('applies error styles and shows error message', () => {
    render(<Select id="select4" options={options} error="必須です" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500');
    expect(screen.getByText('必須です')).toBeInTheDocument();
  });

  // disabled
  it('can be disabled', () => {
    render(<Select id="select5" options={options} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  // onChange
  it('calls onChange when selection changes', async () => {
    const handleChange = vi.fn();
    render(<Select id="select6" options={options} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '1');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // left icon
  it('renders left icon if provided', () => {
    render(<Select id="select7" options={options} leftIcon={<span>🔍</span>} />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  // right ChevronDown アイコン
  it('renders right ChevronDown icon', () => {
    render(<Select id="select8" options={options} />);
    const chevron = document.querySelector('svg.lucide-chevron-down');
    expect(chevron).toBeInTheDocument();
  });

  // helperText
  it('renders helper text when no error', () => {
    render(<Select id="select9" options={options} helperText="補助テキスト" />);
    expect(screen.getByText('補助テキスト')).toBeInTheDocument();
  });

  it('does not render helper text when error exists', () => {
    render(<Select id="select10" options={options} helperText="補助テキスト" error="必須" />);
    expect(screen.queryByText('補助テキスト')).toBeNull();
  });

  // className
  it('applies custom className', () => {
    render(<Select id="select11" options={options} className="my-custom-class" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('my-custom-class');
  });

  // ref forwarding
  it('supports ref forwarding', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select id="select12" options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  // passes additional props
  it('accepts additional props', () => {
    render(<Select id="select13" options={options} name="my-select" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'my-select');
  });
});
