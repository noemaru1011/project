import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'UI/Textarea',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const defaultTextarea: Story = {
  ...Template,
  args: {
    label: '備考欄',
  },
};
