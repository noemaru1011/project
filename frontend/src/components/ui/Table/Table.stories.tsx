import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import React from 'react';

const meta = {
  component: Table,
  title: 'UI/Table',
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const labels: Record<keyof Row, string> = {
  id: 'ID',
  name: '名前',
  email: 'メールアドレス',
  role: '役割',
};

const data: Row[] = [
  { id: '1', name: '田中 太郎', email: 'tanaka@example.com', role: '管理者' },
  { id: '2', name: '佐藤 花子', email: 'sato@example.com', role: '一般ユーザー' },
  { id: '3', name: '鈴木 一郎', email: 'suzuki@example.com', role: '一般ユーザー' },
];

export const Default: Story = {
  args: {
    labels,
    data,
    keyField: 'id',
  },
};

export const WithCheckboxes: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const handleSelect = (id: string, checked: boolean) => {
      if (checked) setSelectedIds([...selectedIds, id]);
      else setSelectedIds(selectedIds.filter((item) => item !== id));
    };

    return (
      <Table {...args} showCheckbox={true} selectedIds={selectedIds} onSelect={handleSelect} />
    );
  },
  args: {
    ...Default.args,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};
