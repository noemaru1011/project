import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import type { Option } from '@/components/ui/option';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  tags: ['autodocs'],
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options: Option[] = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: 'その他' },
];

export const defaultRadioGroup: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <RadioGroup {...args} value={value} onChange={(v) => setValue(v)} />;
  },
  args: {
    name: 'gender',
    label: '性別',
    options,
  },
};
