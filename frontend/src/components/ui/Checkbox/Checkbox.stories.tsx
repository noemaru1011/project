import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Atoms/Checkbox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Checkbox {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const defaultCheckbox: Story = {
  ...Template,
  args: {
    id: 'textInput',
    label: 'テキスト',
  },
};

export const disabledCheckbox: Story = {
  ...Template,
  args: {
    id: 'textInput',
    label: 'テキスト',
    disabled: true,
  },
};
