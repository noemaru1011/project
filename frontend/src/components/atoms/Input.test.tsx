import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  // ラベル関連
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

  // エラー関連
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

  // disabled
  it('renders disabled input', () => {
    render(<Input id="nickname" type="text" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  // 入力値
  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input id="comment" type="text" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  // input type
  it('renders correct input type', () => {
    render(<Input id="age" type="number" />);
    const input = screen.getByRole('spinbutton'); // number input の role
    expect(input).toHaveAttribute('type', 'number');
  });

  // アイコン表示
  it('renders left icon', () => {
    render(<Input id="icon" type="text" leftIcon={<span>🔍</span>} />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Input id="icon" type="text" rightIcon={<span>✅</span>} />);
    expect(screen.getByText('✅')).toBeInTheDocument();
  });

  // ヘルパーテキスト
  it('renders helper text when no error', () => {
    render(<Input id="bio" type="text" helperText="必須ではありません" />);
    expect(screen.getByText('必須ではありません')).toBeInTheDocument();
  });

  it('does not render helper text when error exists', () => {
    render(<Input id="bio" type="text" helperText="ヘルプ" error="エラー" />);
    expect(screen.queryByText('ヘルプ')).toBeNull();
  });

  // className
  it('applies custom className', () => {
    render(<Input id="custom" type="text" className="my-custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('my-custom-class');
  });

  // ref forwarding
  it('supports ref forwarding', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input id="refTest" type="text" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // その他の input 属性
  it('sets autoComplete to off', () => {
    render(<Input id="auto" type="text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('passes additional props to input', () => {
    render(<Input id="extra" type="text" placeholder="入力してください" />);
    const input = screen.getByPlaceholderText('入力してください');
    expect(input).toBeInTheDocument();
  });
});
