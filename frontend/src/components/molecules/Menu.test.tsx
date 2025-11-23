import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Menu } from './Menu';
import { MenuOptions } from './Menu';

// ------------------------------
// atoms mock
// ------------------------------
vi.mock('@/components/atoms/MenuToggle', () => ({
  MenuToggle: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="menu-toggle" onClick={onClick}>
      toggle
    </button>
  ),
}));

vi.mock('@/components/atoms/MenuOverlay', () => ({
  MenuOverlay: ({ onClick }: { onClick: () => void }) => (
    <div data-testid="overlay" onClick={onClick}>
      overlay
    </div>
  ),
}));

vi.mock('@/components/atoms/MenuPanel', () => ({
  MenuPanel: ({
    options,
    onClick,
  }: {
    options: { value: string; label: string }[];
    onClick: () => void;
  }) => (
    <div data-testid="menu-panel">
      {options.map((opt) => (
        <button key={opt.value} data-testid={`menu-item-${opt.value}`} onClick={onClick}>
          {opt.label}
        </button>
      ))}
    </div>
  ),
}));

// ------------------------------
// tests
// ------------------------------
describe('Menu', () => {
  test('renders MenuToggle always', () => {
    render(<Menu open={false} onClick={() => {}} />);

    expect(screen.getByTestId('menu-toggle')).toBeInTheDocument();
  });

  test('does not render overlay or panel when open is false', () => {
    render(<Menu open={false} onClick={() => {}} />);

    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-panel')).not.toBeInTheDocument();
  });

  test('renders overlay and panel when open is true', () => {
    render(<Menu open={true} onClick={() => {}} />);

    expect(screen.getByTestId('overlay')).toBeInTheDocument();
    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();

    MenuOptions.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  test('calls onClick when overlay is clicked', () => {
    const handleClick = vi.fn();
    render(<Menu open={true} onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('overlay'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls onClick when menu panel option is clicked', () => {
    const handleClick = vi.fn();
    render(<Menu open={true} onClick={handleClick} />);

    const firstItem = screen.getByTestId(`menu-item-${MenuOptions[0].value}`);
    fireEvent.click(firstItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders all MenuOptions items', () => {
    render(<Menu open={true} onClick={() => {}} />);

    MenuOptions.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });
});
