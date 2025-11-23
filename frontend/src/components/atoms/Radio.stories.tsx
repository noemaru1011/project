import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Atoms/Radio',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Radio {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const defaultRadio: Story = {
  ...Template,
  args: {
    id: 'textInput',
    label: 'テキスト',
  },
};

export const disabledRadio: Story = {
  ...Template,
  args: {
    id: 'textInput',
    label: 'テキスト',
    disabled: true,
  },
};
