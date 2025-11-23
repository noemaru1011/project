import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
];

describe('RadioGroup', () => {
  test('renders label', () => {
    render(<RadioGroup name="gender" label="性別" options={options} />);

    expect(screen.getByText('性別')).toBeInTheDocument();
  });

  test('renders radio buttons', () => {
    render(<RadioGroup name="gender" options={options} />);

    expect(screen.getByLabelText('男性')).toBeInTheDocument();
    expect(screen.getByLabelText('女性')).toBeInTheDocument();
  });

  test('calls onChange when a radio is selected (exclusive selection)', () => {
    const handleChange = vi.fn();

    render(<RadioGroup name="gender" options={options} value="" onChange={handleChange} />);

    const maleRadio = screen.getByLabelText('男性');

    fireEvent.click(maleRadio);

    expect(handleChange).toHaveBeenCalledWith('male');
  });

  test('reflects the value prop', () => {
    render(<RadioGroup name="gender" options={options} value="female" />);

    expect(screen.getByLabelText('女性')).toBeChecked();
    expect(screen.getByLabelText('男性')).not.toBeChecked();
  });

  test('displays error message', () => {
    render(<RadioGroup name="gender" options={options} error="必須項目です" />);

    expect(screen.getByText('必須項目です')).toBeInTheDocument();
  });

  test('applies disabled state', () => {
    render(<RadioGroup name="gender" options={options} disabled />);

    const maleRadio = screen.getByLabelText('男性');

    expect(maleRadio).toBeDisabled();
  });
});
