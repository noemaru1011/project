import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
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
    const handleChange = vi.fn();
    render(<Radio id="radio1" label="クリック" onChange={handleChange} />);
    const radio = screen.getByRole('radio', { name: /クリック/i });

    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('toggles checked state when clicked', () => {
    render(<Radio id="radio1" label="チェック" />);
    const radio = screen.getByRole('radio', { name: /チェック/i }) as HTMLInputElement;

    expect(radio.checked).toBe(false);
    fireEvent.click(radio);
    expect(radio.checked).toBe(true);
  });

  it('supports ref forwarding', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio id="radio1" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
