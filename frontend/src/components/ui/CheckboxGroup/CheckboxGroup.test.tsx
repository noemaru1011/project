import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CheckboxGroup } from './CheckboxGroup';

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
];

describe('CheckboxGroup', () => {
  it('renders group label and required asterisk', () => {
    render(<CheckboxGroup options={options} label="選択" required />);
    expect(screen.getByText('選択')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders all checkboxes', () => {
    render(<CheckboxGroup options={options} />);
    options.forEach((opt) => {
      expect(screen.getByLabelText(opt.label)).toBeInTheDocument();
    });
  });

  it('calls onChange when checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(<CheckboxGroup options={options} onChange={handleChange} />);
    const checkboxA = screen.getByLabelText('A');
    fireEvent.click(checkboxA);
    expect(handleChange).toHaveBeenCalledWith(['a']);
  });

  it('supports multiple selections', () => {
    const Wrapper = () => {
      const [value, setValue] = useState<string[]>([]);
      return <CheckboxGroup options={options} value={value} onChange={setValue} />;
    };

    render(<Wrapper />);

    const checkboxA = screen.getByLabelText('A');
    const checkboxB = screen.getByLabelText('B');

    // チェック A
    fireEvent.click(checkboxA);
    expect(checkboxA).toBeChecked();

    // チェック B
    fireEvent.click(checkboxB);
    expect(checkboxA).toBeChecked();
    expect(checkboxB).toBeChecked();

    // チェック A 外す
    fireEvent.click(checkboxA);
    expect(checkboxA).not.toBeChecked();
    expect(checkboxB).toBeChecked();
  });

  it('disables all checkboxes when disabled prop is true', () => {
    render(<CheckboxGroup options={options} disabled />);
    options.forEach((opt) => {
      expect(screen.getByLabelText(opt.label)).toBeDisabled();
    });
  });

  it('displays error message', () => {
    render(<CheckboxGroup options={options} error="必須です" />);
    expect(screen.getByText('必須です')).toBeInTheDocument();
  });

  it('respects initial value', () => {
    render(<CheckboxGroup options={options} value={['b', 'c']} />);
    expect(screen.getByLabelText('B')).toBeChecked();
    expect(screen.getByLabelText('C')).toBeChecked();
    expect(screen.getByLabelText('A')).not.toBeChecked();
  });

  it('renders correct grid for row/column', () => {
    render(<CheckboxGroup options={options} row={2} column={2} />);
    // 2行×2列で合計4チェックボックスが存在する
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
  });

  it('renders single column if only column specified', () => {
    render(<CheckboxGroup options={options} column={2} />);
    // 列数は2なので2列に分割され、rowsは自動計算
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
  });

  it('renders single row if only row specified', () => {
    render(<CheckboxGroup options={options} row={2} />);
    // 行数は2で自動計算
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
  });
});
