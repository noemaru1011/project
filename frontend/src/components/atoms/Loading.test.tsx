import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders spinner when loading is true', () => {
    render(<Loading loading={true} />);
    const spinner = screen.getByRole('status', { name: /読み込み中/i });
    expect(spinner).toBeInTheDocument();
  });

  it('renders children when loading is false', () => {
    render(<Loading loading={false}>Content</Loading>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
