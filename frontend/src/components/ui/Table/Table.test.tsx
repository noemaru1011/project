import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Table', () => {
  const mockLabels = {
    id: 'ID',
    name: '名前',
    email: 'メールアドレス',
  };

  const mockData = [
    { id: '1', name: 'ユーザー1', email: 'user1@example.com' },
    { id: '2', name: 'ユーザー2', email: 'user2@example.com' },
  ];

  const renderTable = (props: any) => {
    return render(
      <BrowserRouter>
        <Table {...props} />
      </BrowserRouter>,
    );
  };

  // ============================================
  // Props テスト
  // ============================================
  describe('Props テスト', () => {
    describe('labels & data', () => {
      it('ヘッダーにラベルが正しく表示される', () => {
        renderTable({ labels: mockLabels, data: mockData, keyField: 'id' });
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('名前')).toBeInTheDocument();
        expect(screen.getByText('メールアドレス')).toBeInTheDocument();
      });

      it('データが正しく表示される', () => {
        renderTable({ labels: mockLabels, data: mockData, keyField: 'id' });
        expect(screen.getByText('ユーザー1')).toBeInTheDocument();
        expect(screen.getByText('user1@example.com')).toBeInTheDocument();
        expect(screen.getByText('ユーザー2')).toBeInTheDocument();
        expect(screen.getByText('user2@example.com')).toBeInTheDocument();
      });

      it('データが空の場合、「データがありません」と表示される', () => {
        renderTable({ labels: mockLabels, data: [], keyField: 'id' });
        expect(screen.getByText('データがありません')).toBeInTheDocument();
      });
    });

    describe('showCheckbox', () => {
      it('showCheckbox=true の場合にチェックボックス列が表示される', () => {
        renderTable({
          labels: mockLabels,
          data: mockData,
          keyField: 'id',
          showCheckbox: true,
          selectedIds: [],
          onSelect: () => {},
        });
        expect(screen.getByText('チェック')).toBeInTheDocument();
        expect(screen.getAllByRole('checkbox')).toHaveLength(mockData.length);
      });

      it('selectedIds に含まれる行のチェックボックスがチェックされている', () => {
        renderTable({
          labels: mockLabels,
          data: mockData,
          keyField: 'id',
          showCheckbox: true,
          selectedIds: ['1'],
          onSelect: () => {},
        });
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
      });

      it('チェックボックスを変更した時に onSelect が呼ばれる', () => {
        const handleSelect = vi.fn();
        renderTable({
          labels: mockLabels,
          data: mockData,
          keyField: 'id',
          showCheckbox: true,
          selectedIds: [],
          onSelect: handleSelect,
        });
        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);
        expect(handleSelect).toHaveBeenCalledWith('1', true);
      });
    });

    describe('actions', () => {
      it('actions が指定された場合に「操作」列が表示される', () => {
        renderTable({
          labels: mockLabels,
          data: mockData,
          keyField: 'id',
          actions: ['Update'],
          routeMap: { Update: (id: string) => `/update/${id}` },
        });
        expect(screen.getByText('操作')).toBeInTheDocument();
      });
    });

    describe('className & tableClassName', () => {
      it('カスタム className が適用される', () => {
        const { container } = renderTable({
          labels: mockLabels,
          data: mockData,
          keyField: 'id',
          className: 'custom-wrapper',
        });
        expect(container.firstChild).toHaveClass('custom-wrapper');
      });

      it('カスタム tableClassName が適用される', () => {
        renderTable({
          labels: mockLabels,
          data: mockData,
          keyField: 'id',
          tableClassName: 'custom-table',
        });
        expect(screen.getByRole('table')).toHaveClass('custom-table');
      });
    });
  });

  // ============================================
  // アクセシビリティ テスト
  // ============================================
  describe('アクセシビリティ', () => {
    it('table 要素が role="table" を持っている (暗黙的)', () => {
      renderTable({ labels: mockLabels, data: mockData, keyField: 'id' });
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  // ============================================
  // スナップショット テスト
  // ============================================
  describe('スナップショット', () => {
    it('基本状態の HTML 構造', () => {
      const { container } = renderTable({ labels: mockLabels, data: mockData, keyField: 'id' });
      expect(container.firstChild).toMatchSnapshot();
    });

    it('チェックボックスありの状態の HTML 構造', () => {
      const { container } = renderTable({
        labels: mockLabels,
        data: mockData,
        keyField: 'id',
        showCheckbox: true,
        selectedIds: ['1'],
        onSelect: () => {},
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
