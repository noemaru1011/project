import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'UI/Table',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

const labels = {
  id: 'ID',
  name: '名前',
  email: 'メールアドレス',
  role: '役割',
};

const data = [
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

export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: ['Update', 'Delete'],
    routeMap: {
      Update: (id) => `/users/${id}/edit`,
      Delete: (id) => `/users/${id}/delete`,
    },
  },
};

export const WithCheckboxes: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const handleSelect = (id: string, checked: boolean) => {
      if (checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    };
    // @ts-ignore
    return <Table {...args} selectedIds={selectedIds} onSelect={handleSelect} />;
  },
  args: {
    ...Default.args,
    showCheckbox: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};
