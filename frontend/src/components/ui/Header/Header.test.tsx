import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from './Header';

// useLogout モック（ES モジュール方式）
const logoutMock = vi.fn();
vi.mock('@/hooks/useLogout', () => ({
  useLogout: () => ({ logout: logoutMock, loading: false }),
}));

// 子コンポーネントを簡易モック
vi.mock('@/components/atoms/HeaderMain', () => ({
  HeaderMain: ({ label }: { label: string }) => <div data-testid="HeaderMain">{label}</div>,
}));

vi.mock('@/components/atoms/HeaderNav', () => ({
  HeaderNav: ({ options, onLogout }: any) => (
    <div data-testid="HeaderNav">
      {options.map((o: any) => (
        <button key={o.value}>{o.label}</button>
      ))}
      <button onClick={onLogout}>Logout</button>
    </div>
  ),
}));

vi.mock('@/components/molecules/Menu', () => ({
  Menu: ({ open, onClick }: any) => (
    <button data-testid="Menu" onClick={onClick}>
      {open ? 'Open' : 'Closed'}
    </button>
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    logoutMock.mockClear();
  });

  test('renders HeaderMain and HeaderNav', () => {
    render(<Header />);
    expect(screen.getByTestId('HeaderMain')).toBeInTheDocument();
    expect(screen.getByTestId('HeaderNav')).toBeInTheDocument();
  });

  test('Menu toggle works on click', () => {
    render(<Header />);
    const menuButton = screen.getByTestId('Menu');

    expect(menuButton).toHaveTextContent('Closed');
    fireEvent.click(menuButton);
    expect(menuButton).toHaveTextContent('Open');
    fireEvent.click(menuButton);
    expect(menuButton).toHaveTextContent('Closed');
  });

  test('logout button calls onLogout', () => {
    render(<Header />);
    const logoutButton = screen.getByText('Logout');

    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});
