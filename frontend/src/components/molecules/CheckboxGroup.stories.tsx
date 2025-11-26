import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './CheckboxGroup';
import type { Option } from '@/interface/ui';

export default {
  title: 'Molecules/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
} as Meta<typeof CheckboxGroup>;

type Story = StoryObj<typeof CheckboxGroup>;

const options: Option[] = [
  { value: 'option1', label: 'オプション1' },
  { value: 'option2', label: 'オプション2' },
  { value: 'option3', label: 'オプション3' },
];

const Template = (args: any) => {
  const [selected, setSelected] = useState<string[]>([]);
  return <CheckboxGroup {...args} value={selected} onChange={setSelected} />;
};

export const Default: Story = {
  render: Template,
  args: {
    label: 'チェックボックスグループ',
    options,
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    label: 'チェックボックスグループ',
    options,
    error: '必須項目です',
  },
};

export const Required: Story = {
  render: Template,
  args: {
    label: '必須チェックボックス',
    options,
    required: true,
  },
};
