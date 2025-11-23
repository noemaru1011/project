import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox id="test" label="チェックボックス" />);
    const checkbox = screen.getByRole('checkbox', { name: /チェックボックス/i });
    expect(checkbox).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Checkbox id="test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox id="test" label="無効" disabled />);
    const checkbox = screen.getByRole('checkbox', { name: /無効/i });
    expect(checkbox).toBeDisabled();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox id="test" label="クリック" onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox', { name: /クリック/i });

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
