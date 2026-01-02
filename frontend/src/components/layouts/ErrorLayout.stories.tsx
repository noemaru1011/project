import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorLayout } from './ErrorLayout';

const meta: Meta<typeof ErrorLayout> = {
  component: ErrorLayout,
  title: 'Layout/ErrorLayout',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const defultErrorLayout: Story = {
  args: {
    type: '404',
    onGoBack: () => alert('クリックされました！'),
    onRetry: () => alert('クリックされました！'),
    onGoHome: () => alert('クリックされました！'),
  },
};
