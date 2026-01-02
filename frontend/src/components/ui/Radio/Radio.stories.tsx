import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'UI/Radio',
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
    label: 'テキスト',
  },
};
