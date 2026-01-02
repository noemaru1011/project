import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './CheckboxGroup';
import type { Option } from '@/components/ui/option';

export default {
  title: 'UI/CheckboxGroup',
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

export const defaultCheckboxGroup: Story = {
  render: Template,
  args: {
    label: 'チェックボックスグループ',
    options,
  },
};
