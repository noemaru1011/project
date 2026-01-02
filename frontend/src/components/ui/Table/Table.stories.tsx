import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

type Data = {
  id: number;
  name: string;
  age: number;
};
const labels = { id: 'ID', name: 'Name', age: 'Age' };

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'UI/Table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const data: Data[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

export const defaultTable: Story = {
  render: () => <Table labels={labels} data={data} keyField="id" />,
};
