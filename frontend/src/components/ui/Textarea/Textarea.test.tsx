import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders label and required asterisk', () => {
    render(<Textarea id="desc" label="説明" required />);
    expect(screen.getByText('説明')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Textarea id="desc" error="必須です" />);
    expect(screen.getByText('必須です')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Textarea id="desc" disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('accepts user input', () => {
    const { container } = render(<Textarea id="desc" />);
    const textarea = container.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'テスト入力' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('テスト入力');
  });
});
