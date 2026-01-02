import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'UI/Input',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const defaultInput: Story = {
  ...Template,
  args: {
    label: 'テキスト',
    type: 'text',
    value: 'テキスト',
  },
};
