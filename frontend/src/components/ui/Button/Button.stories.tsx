import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const defultButton: Story = {
  args: {
    variant: 'Create',
    type: 'button',
    onClick: () => alert('クリックされました！'),
  },
};
