import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input id="username" type="text" label="ユーザー名" />);
    const label = screen.getByText('ユーザー名');
    expect(label).toBeInTheDocument();
  });

  it('renders required label with asterisk', () => {
    render(<Input id="email" type="email" label="メール" required />);
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input id="password" type="password" error="必須項目です" />);
    const error = screen.getByText('必須項目です');
    expect(error).toBeInTheDocument();
  });

  it('applies error style', () => {
    render(<Input id="password" type="password" label="パスワード" error="必須" />);
    const input = screen.getByLabelText('パスワード');
    expect(input).toHaveClass('border-red-500');
  });

  it('renders disabled input', () => {
    render(<Input id="nickname" type="text" disabled />);
    const input = screen.getByRole('textbox', { name: '' }) || screen.getByLabelText(/nickname/i);
    expect(input).toBeDisabled();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input id="comment" type="text" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('renders correct input type', () => {
    render(<Input id="age" type="number" />);
    const input = screen.getByRole('spinbutton'); // number input の role
    expect(input).toHaveAttribute('type', 'number');
  });
});
