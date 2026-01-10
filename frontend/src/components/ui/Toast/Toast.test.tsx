import { render } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    it('レンダリングされる', () => {
      const { container } = render(<Toast />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('ToastContainer の初期 HTML 構造', () => {
      const { container } = render(<Toast />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
