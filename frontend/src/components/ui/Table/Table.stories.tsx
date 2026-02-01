import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import React from 'react';

const meta = {
  component: Table,
  title: 'UI/Table',
  tags: ['autodocs'],
  args: {
    onAction: {
      Read: (id: string) => console.log('Read Action:', id),
      Update: (id: string) => console.log('Update Action:', id),
      Delete: (id: string) => console.log('Delete Action:', id),
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

/** --- データの定義 (Row型を再利用) --- */
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
  { id: '2', name: '佐藤 花子', email: 'sato@example.com', role: '一般' },
];

/** --- ストーリー定義 --- */

export const Default: Story = {
  args: {
    labels,
    data,
    keyField: 'id',
  },
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: ['Read', 'Update', 'Delete'],
  },
};

export const WithCheckboxes: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const handleSelect = (id: string, checked: boolean) => {
      if (checked) setSelectedIds((prev) => [...prev, id]);
      else setSelectedIds((prev) => prev.filter((item) => item !== id));
    };

    return (
      <Table {...args} showCheckbox={true} selectedIds={selectedIds} onSelect={handleSelect} />
    );
  },
  args: {
    ...Default.args,
    actions: ['Read'],
  },
};
