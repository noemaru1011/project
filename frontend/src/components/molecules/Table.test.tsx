import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Table } from './Table';
import type { Action } from './RowActions'; // Action 型を import

// テスト用のラベル
const StudentLabels: Record<string, string> = {
  studentId: '学生ID',
  name: '名前',
  age: '年齢',
};

// テスト用のデータ
const student = [
  { studentId: '1', name: 'Alice', age: '20' },
  { studentId: '2', name: 'Bob', age: '22' },
];

// Action 型に合わせる
const actions: Action[] = ['Update', 'Read', 'Delete'];

// routeMap も Action のキーを揃える
const routeMap: Record<Action, (id: string) => string> = {
  Update: (id) => `/student/update/${id}`,
  Read: (id) => `/student/view/${id}`,
  Delete: (id) => `/student/delete/${id}`,
};

describe('Table Component', () => {
  it('renders table headers correctly', () => {
    render(
      <MemoryRouter>
        <Table
          labels={StudentLabels}
          data={student}
          keyField="studentId"
          actions={actions}
          routeMap={routeMap}
        />
      </MemoryRouter>,
    );

    // ラベルが表示されているか
    Object.values(StudentLabels).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders all data rows correctly', () => {
    render(
      <MemoryRouter>
        <Table
          labels={StudentLabels}
          data={student}
          keyField="studentId"
          actions={actions}
          routeMap={routeMap}
        />
      </MemoryRouter>,
    );

    student.forEach((row) => {
      Object.values(row).forEach((value) => {
        expect(screen.getByText(value)).toBeInTheDocument();
      });
    });
  });

  it('renders action buttons for each row', () => {
    render(
      <MemoryRouter>
        <Table
          labels={StudentLabels}
          data={student}
          keyField="studentId"
          actions={actions}
          routeMap={routeMap}
        />
      </MemoryRouter>,
    );

    // student.forEach ではなく、まとめてチェック
    expect(screen.getAllByText('更新').length).toBe(student.length);
    expect(screen.getAllByText('参照').length).toBe(student.length);
    expect(screen.getAllByText('削除').length).toBe(student.length);
  });
});
