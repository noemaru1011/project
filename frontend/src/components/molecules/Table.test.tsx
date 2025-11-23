import { render, screen } from '@testing-library/react';
import { Table } from './Table';

type Data = {
  id: string;
  user: {
    name: string;
    age: number;
  };
  status: string;
};

const labels = {
  user: {
    name: '名前',
    age: '年齢',
  },
  status: 'ステータス',
};

const data: Data[] = [
  { id: '1', user: { name: '太郎', age: 20 }, status: 'active' },
  { id: '2', user: { name: '花子', age: 25 }, status: 'inactive' },
];

describe('Table', () => {
  it('renders table headers', () => {
    render(<Table labels={labels} data={data} keyField="id" />);

    expect(screen.getByText('名前')).toBeInTheDocument();
    expect(screen.getByText('年齢')).toBeInTheDocument();
    expect(screen.getByText('ステータス')).toBeInTheDocument();
  });

  it('renders table rows with flattened data', () => {
    render(<Table labels={labels} data={data} keyField="id" />);

    // 各セルの値を確認
    expect(screen.getByText('太郎')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();

    expect(screen.getByText('花子')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('inactive')).toBeInTheDocument();
  });
});
