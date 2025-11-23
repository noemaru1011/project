import { render, screen, fireEvent } from '@testing-library/react';
import { CheckboxGroup } from './CheckboxGroup';
import { vi } from 'vitest';

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

describe('CheckboxGroup', () => {
  it('renders label', () => {
    render(<CheckboxGroup options={options} label="選択" />);

    expect(screen.getByText('選択')).toBeInTheDocument();
  });

  it('calls onChange when checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(<CheckboxGroup options={options} onChange={handleChange} />);

    const checkboxA = screen.getByLabelText('A');

    fireEvent.click(checkboxA);

    // value は ["a"] で渡される
    expect(handleChange).toHaveBeenCalledWith(['a']);
  });

  it('shows error message', () => {
    render(<CheckboxGroup options={options} error="必須です" />);

    expect(screen.getByText('必須です')).toBeInTheDocument();
  });
});
