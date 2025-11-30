import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
];

describe('RadioGroup', () => {
  it('renders label and required asterisk', () => {
    render(<RadioGroup name="test" label="選択" required options={options} />);
    expect(screen.getByText('選択')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<RadioGroup name="test" options={options} />);
    options.forEach((opt) => {
      expect(screen.getByLabelText(opt.label)).toBeInTheDocument();
    });
  });

  it('checks the correct value when selected', () => {
    let value = '';
    const handleChange = (v: string) => (value = v);

    render(<RadioGroup name="test" value={value} onChange={handleChange} options={options} />);
    const radioA = screen.getByLabelText('A');
    const radioB = screen.getByLabelText('B');

    fireEvent.click(radioA);
    expect(value).toBe('a');

    fireEvent.click(radioB);
    expect(value).toBe('b');
  });

  it('renders error message', () => {
    render(<RadioGroup name="test" options={options} error="必須です" />);
    expect(screen.getByText('必須です')).toBeInTheDocument();
  });

  it('respects the disabled prop', () => {
    render(<RadioGroup name="test" options={options} disabled />);
    options.forEach((opt) => {
      expect(screen.getByLabelText(opt.label)).toBeDisabled();
    });
  });

  it('supports row and column grid layout', () => {
    render(<RadioGroup name="test" options={options} row={2} column={2} />);
    // 最初の行のラベルを確認
    expect(screen.getByLabelText('A')).toBeInTheDocument();
    expect(screen.getByLabelText('B')).toBeInTheDocument();
    // 2列目に何もない場合はレンダリングされない or div placeholderを無視
  });
});
