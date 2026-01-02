import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'UI/Checkbox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const rest: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Checkbox {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const defaultCheckbox: Story = {
  ...rest,
  args: {
    id: 'sample',
    label: 'テキスト',
  },
};
