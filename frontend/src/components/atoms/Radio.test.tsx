import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio id="radio1" label="ラジオボタン" />);
    const radio = screen.getByRole('radio', { name: /ラジオボタン/i });
    expect(radio).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Radio id="radio1" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio id="radio1" label="無効" disabled />);
    const radio = screen.getByRole('radio', { name: /無効/i });
    expect(radio).toBeDisabled();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vi.fn(); // vitest 用
    render(<Radio id="radio1" label="クリック" onChange={handleChange} />);
    const radio = screen.getByRole('radio', { name: /クリック/i });

    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
